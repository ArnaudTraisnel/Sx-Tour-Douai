#!/usr/bin/env node

/* eslint-env node */

/**
 * Script de compression vidéo WebM
 * Utilise FFmpeg pour compresser les vidéos et réduire leur taille
 * 
 * Usage:
 * node video-compressor.js input.webm output.webm [quality]
 * 
 * Paramètres:
 * - input.webm: fichier vidéo source
 * - output.webm: fichier vidéo compressé de sortie
 * - quality: niveau de qualité (optionnel, défaut: 23, plage: 15-35)
 *   Plus le nombre est bas, meilleure est la qualité (mais plus gros fichier)
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class VideoCompressor {
    constructor() {
        this.defaultQuality = 23; // Bon compromis qualité/taille
        this.supportedFormats = ['.webm', '.mp4', '.avi', '.mov'];
    }

    /**
     * Vérifie si FFmpeg est installé
     */
    async checkFFmpeg() {
        return new Promise((resolve) => {
            const ffmpeg = spawn('ffmpeg', ['-version']);
            
            ffmpeg.on('error', () => {
                console.error('❌ FFmpeg n\'est pas installé ou n\'est pas dans le PATH');
                console.log('💡 Installez FFmpeg depuis: https://ffmpeg.org/download.html');
                resolve(false);
            });
            
            ffmpeg.on('close', (code) => {
                resolve(code === 0);
            });
        });
    }

    /**
     * Obtient les informations d'une vidéo
     */
    async getVideoInfo(inputPath) {
        return new Promise((resolve, reject) => {
            const ffprobe = spawn('ffprobe', [
                '-v', 'quiet',
                '-print_format', 'json',
                '-show_format',
                '-show_streams',
                inputPath
            ]);

            let stdout = '';
            let stderr = '';

            ffprobe.stdout.on('data', (data) => {
                stdout += data.toString();
            });

            ffprobe.stderr.on('data', (data) => {
                stderr += data.toString();
            });

            ffprobe.on('close', (code) => {
                if (code === 0) {
                    try {
                        const info = JSON.parse(stdout);
                        resolve(info);
                    } catch (e) {
                        reject(new Error('Erreur lors de l\'analyse de la vidéo'));
                    }
                } else {
                    reject(new Error(`FFprobe error: ${stderr}`));
                }
            });
        });
    }

    /**
     * Formate la taille du fichier
     */
    formatFileSize(bytes) {
        const sizes = ['B', 'KB', 'MB', 'GB'];
        if (bytes === 0) return '0 B';
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
    }

    /**
     * Convertit un temps en secondes
     */
    timeToSeconds(timeStr) {
        const parts = timeStr.split(':');
        return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
    }

    /**
     * Compresse une vidéo WebM
     */
    async compressVideo(inputPath, outputPath, quality = this.defaultQuality, totalDuration = 0) {
        console.log(`🎬 Compression de: ${inputPath}`);
        console.log(`📁 Sortie: ${outputPath}`);
        console.log(`⚙️  Qualité: ${quality} (CRF)`);
        console.log(`⏱️  Durée totale: ${totalDuration}s`);
        console.log('');

        // Paramètres de compression optimisés pour WebM
        const ffmpegArgs = [
            '-i', inputPath,
            '-c:v', 'libvpx-vp9',        // Codec vidéo VP9 (plus efficace que VP8)
            '-crf', quality.toString(),   // Facteur de qualité constant
            '-b:v', '0',                  // Bitrate variable (VBR)
            '-c:a', 'libopus',           // Codec audio Opus (plus efficace que Vorbis)
            '-b:a', '128k',              // Bitrate audio 128kbps
            '-speed', '1',               // Vitesse d'encodage (0=plus lent mais meilleur, 4=plus rapide)
            '-tile-columns', '2',        // Optimisation pour le parallélisme
            '-frame-parallel', '1',      // Encodage en parallèle
            '-auto-alt-ref', '1',        // Images de référence alternatives
            '-lag-in-frames', '25',      // Lookahead pour de meilleures décisions d'encodage
            '-deadline', 'good',         // Mode "good" pour équilibrer vitesse/qualité
            '-cpu-used', '2',            // Utilisation du CPU (0-5, 2 est un bon compromis)
            '-progress', 'pipe:1',       // Sortie de progression vers stdout
            '-y',                        // Écraser le fichier de sortie sans confirmation
            outputPath
        ];

        return new Promise((resolve, reject) => {
            const ffmpeg = spawn('ffmpeg', ffmpegArgs);
            
            let stderr = '';
            let lastProgress = '';
            
            // Gérer la progression via stdout
            ffmpeg.stdout.on('data', (data) => {
                const lines = data.toString().split('\n');
                for (const line of lines) {
                    if (line.startsWith('out_time_ms=')) {
                        const timeMs = parseInt(line.split('=')[1]);
                        const currentTime = timeMs / 1000000; // Convertir microsecondes en secondes
                        
                        if (totalDuration > 0) {
                            const percentage = Math.min(100, (currentTime / totalDuration * 100));
                            const progressBar = this.createProgressBar(percentage);
                            const timeStr = this.formatTime(currentTime);
                            const totalTimeStr = this.formatTime(totalDuration);
                            
                            process.stdout.write(`\r🎬 ${progressBar} ${percentage.toFixed(1)}% - ${timeStr}/${totalTimeStr}`);
                        }
                    }
                }
            });
            
            ffmpeg.stderr.on('data', (data) => {
                stderr += data.toString();
                
                // Fallback: affichage du temps si pas de progression stdout
                if (!stderr.includes('out_time_ms=')) {
                    const progressMatch = stderr.match(/time=(\d{2}:\d{2}:\d{2}\.\d{2})/);
                    if (progressMatch && progressMatch[1] !== lastProgress) {
                        lastProgress = progressMatch[1];
                        const currentSeconds = this.timeToSeconds(progressMatch[1]);
                        
                        if (totalDuration > 0) {
                            const percentage = Math.min(100, (currentSeconds / totalDuration * 100));
                            const progressBar = this.createProgressBar(percentage);
                            process.stdout.write(`\r🎬 ${progressBar} ${percentage.toFixed(1)}% - ${progressMatch[1]}`);
                        } else {
                            process.stdout.write(`\r⏳ Temps: ${progressMatch[1]}`);
                        }
                    }
                }
            });

            ffmpeg.on('error', (error) => {
                reject(new Error(`Erreur FFmpeg: ${error.message}`));
            });

            ffmpeg.on('close', (code) => {
                console.log(''); // Nouvelle ligne après le progrès
                if (code === 0) {
                    resolve();
                } else {
                    reject(new Error(`FFmpeg s'est terminé avec le code: ${code}\n${stderr}`));
                }
            });
        });
    }

    /**
     * Crée une barre de progression
     */
    createProgressBar(percentage) {
        const width = 20;
        const filled = Math.round(width * percentage / 100);
        const empty = width - filled;
        return '█'.repeat(filled) + '░'.repeat(empty);
    }

    /**
     * Formate un temps en secondes vers MM:SS
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }

    /**
     * Fonction principale de compression
     */
    async compress(inputPath, outputPath, quality) {
        try {
            // Vérifier que FFmpeg est installé
            const ffmpegAvailable = await this.checkFFmpeg();
            if (!ffmpegAvailable) {
                throw new Error('FFmpeg n\'est pas disponible');
            }

            // Vérifier que le fichier d'entrée existe
            if (!fs.existsSync(inputPath)) {
                throw new Error(`Le fichier d'entrée n'existe pas: ${inputPath}`);
            }

            // Vérifier l'extension du fichier
            const inputExt = path.extname(inputPath).toLowerCase();
            if (!this.supportedFormats.includes(inputExt)) {
                throw new Error(`Format non supporté: ${inputExt}. Formats supportés: ${this.supportedFormats.join(', ')}`);
            }

            // Obtenir les informations de la vidéo source
            console.log('📊 Analyse de la vidéo source...');
            const videoInfo = await this.getVideoInfo(inputPath);
            const inputSize = fs.statSync(inputPath).size;
            
            const videoStream = videoInfo.streams.find(s => s.codec_type === 'video');
            const totalDuration = parseFloat(videoInfo.format.duration);
            
            if (videoStream) {
                console.log(`📺 Résolution: ${videoStream.width}x${videoStream.height}`);
                console.log(`🎞️  Durée: ${Math.round(totalDuration)}s`);
                console.log(`📦 Taille originale: ${this.formatFileSize(inputSize)}`);
            }

            // Créer le dossier de sortie si nécessaire
            const outputDir = path.dirname(outputPath);
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }

            // Compresser la vidéo
            const startTime = Date.now();
            await this.compressVideo(inputPath, outputPath, quality, totalDuration);
            const endTime = Date.now();

            // Statistiques finales
            const outputSize = fs.statSync(outputPath).size;
            const compressionRatio = ((inputSize - outputSize) / inputSize * 100).toFixed(1);
            const processingTime = Math.round((endTime - startTime) / 1000);
            const sizeDifference = inputSize - outputSize;

            console.log('\n✅ Compression terminée!');
            console.log(`📦 Taille finale: ${this.formatFileSize(outputSize)}`);
            
            if (sizeDifference > 0) {
                console.log(`💾 Économie: ${compressionRatio}% (${this.formatFileSize(sizeDifference)})`);
            } else {
                console.log(`📈 Augmentation: ${Math.abs(compressionRatio)}% (${this.formatFileSize(Math.abs(sizeDifference))})`);
            }
            
            console.log(`⏱️  Temps de traitement: ${processingTime}s`);

        } catch (error) {
            console.error(`❌ Erreur: ${error.message}`);
            process.exit(1);
        }
    }
}

// Script principal
async function main() {
    const args = process.argv.slice(2);
    
    if (args.length < 2) {
        console.log(`
🎬 Compresseur vidéo WebM
=========================

Usage: node video-compressor.js <input> <output> [quality]

Paramètres:
  input    Fichier vidéo source (.webm, .mp4, .avi, .mov)
  output   Fichier vidéo compressé de sortie (.webm)
  quality  Niveau de qualité CRF (optionnel, défaut: 23)
           - 15-20: Très haute qualité (fichier plus gros)
           - 20-25: Haute qualité (recommandé)
           - 25-30: Qualité moyenne (fichier plus petit)
           - 30-35: Basse qualité (très petit fichier)

Exemples:
  node video-compressor.js video.mp4 video-compressed.webm
  node video-compressor.js video.webm video-optimized.webm 25
  node video-compressor.js ../videos/source.mp4 compressed/output.webm 20

Note: FFmpeg doit être installé et accessible dans le PATH
        `);
        process.exit(1);
    }

    const inputPath = path.resolve(args[0]);
    const outputPath = path.resolve(args[1]);
    const quality = args[2] ? parseInt(args[2]) : 23;

    // Validation de la qualité
    if (quality < 15 || quality > 35) {
        console.error('❌ La qualité doit être entre 15 et 35');
        process.exit(1);
    }

    const compressor = new VideoCompressor();
    await compressor.compress(inputPath, outputPath, quality);
}

// Exécuter le script si appelé directement
if (require.main === module) {
    main().catch(console.error);
}

module.exports = VideoCompressor;
