# 🎬 Compresseur Vidéo WebM

Scripts pour compresser des vidéos WebM et réduire leur taille de fichier tout en maintenant une qualité acceptable.

## 📋 Prérequis

1. **Node.js** - [Télécharger](https://nodejs.org/)
2. **FFmpeg** - [Télécharger](https://ffmpeg.org/download.html)
   - Ou installer avec winget: `winget install Gyan.FFmpeg`
   - Assurez-vous que FFmpeg est dans votre PATH

## 📁 Fichiers inclus

- `video-compressor.js` - Script principal de compression (Node.js)
- `compress-video.bat` - Script batch Windows (interface simple)
- `compress-video.ps1` - Script PowerShell (interface avancée)
- `package.json` - Configuration du projet Node.js
- `.eslintrc.js` - Configuration ESLint pour Node.js
- `README.md` - Ce fichier de documentation

## 🚀 Utilisation

### Option 1: Script PowerShell (Recommandé)

```powershell
# Interface interactive
.\compress-video.ps1

# Avec paramètres
.\compress-video.ps1 "video.mp4" "video-compressed.webm" 23

# Afficher l'aide
.\compress-video.ps1 -Help
```

### Option 2: Script Batch

```batch
# Interface interactive
compress-video.bat

# Avec paramètres
compress-video.bat "video.mp4" "video-compressed.webm" 23
```

### Option 3: Node.js direct

```bash
# Utilisation de base
node video-compressor.js input.webm output.webm

# Avec qualité personnalisée
node video-compressor.js input.mp4 output.webm 25

# Afficher l'aide
node video-compressor.js
```

## ⚙️ Paramètres de qualité

Le paramètre de qualité utilise l'échelle CRF (Constant Rate Factor) :

| Valeur | Qualité | Taille | Usage |
|--------|---------|--------|--------|
| 15-20  | Très haute | Plus grosse | Archive, master |
| 20-25  | Haute | Équilibrée | **Recommandé pour le web** |
| 25-30  | Moyenne | Plus petite | Streaming, mobile |
| 30-35  | Basse | Très petite | Prévisualisation |

**Défaut recommandé : 23**

## 📊 Formats supportés

### Entrée
- `.webm` - WebM
- `.mp4` - MP4
- `.avi` - AVI
- `.mov` - QuickTime

### Sortie
- `.webm` - WebM avec VP9 + Opus (optimisé)

## 🔧 Paramètres de compression

Le script utilise des paramètres optimisés pour WebM :

- **Codec vidéo** : VP9 (libvpx-vp9)
- **Codec audio** : Opus (128kbps)
- **Mode** : Qualité constante (CRF)
- **Optimisations** : Parallélisme, lookahead, références alternatives

## 📈 Exemples d'utilisation

### Compression standard
```powershell
.\compress-video.ps1 "SXTour2024.mp4" "SXTour2024-compressed.webm"
```

### Compression haute qualité pour desktop
```powershell
.\compress-video.ps1 "video.mp4" "video-hq.webm" 20
```

### Compression optimisée pour mobile
```powershell
.\compress-video.ps1 "video.mp4" "video-mobile.webm" 28
```

### Traitement par lot (PowerShell)
```powershell
Get-ChildItem "*.mp4" | ForEach-Object {
    $output = $_.BaseName + "-compressed.webm"
    .\compress-video.ps1 $_.FullName $output 23
}
```

## 📊 Résultats attendus

### Vidéo type (1080p, 30fps, 2 minutes)

| Qualité | Taille originale | Taille compressée | Économie |
|---------|------------------|-------------------|----------|
| MP4 H.264 | 50 MB | 25-35 MB | 30-50% |
| WebM VP8 | 40 MB | 20-28 MB | 30-50% |

Les résultats varient selon :
- Résolution et framerate
- Complexité du contenu
- Codec source
- Paramètres de qualité

## 🐛 Dépannage

### FFmpeg non trouvé
```
❌ FFmpeg n'est pas installé ou n'est pas dans le PATH
```
**Solution** : Installez FFmpeg et ajoutez-le au PATH système

### Node.js non trouvé
```
❌ Node.js n'est pas installé ou n'est pas dans le PATH
```
**Solution** : Installez Node.js depuis nodejs.org

### Erreur de permissions PowerShell
```
❌ L'exécution de scripts est désactivée
```
**Solution** : Exécutez PowerShell en administrateur et tapez :
```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Fichier de sortie existe déjà
Le script écrasera automatiquement les fichiers existants.

## 💡 Conseils d'optimisation

1. **Pour le web** : Utilisez qualité 23-25
2. **Pour l'archivage** : Utilisez qualité 18-20
3. **Pour mobile/bandwidth limité** : Utilisez qualité 28-30
4. **Testez** : Commencez par quelques secondes pour tester la qualité
5. **Batch processing** : Utilisez les scripts PowerShell pour traiter plusieurs fichiers

## 🔗 Ressources utiles

- [Guide VP9](https://developers.google.com/media/vp9)
- [FFmpeg WebM Guide](https://trac.ffmpeg.org/wiki/Encode/VP9)
- [Codec Opus](https://opus-codec.org/)

## 🛠️ Développement

### Installation des dépendances
```bash
cd public/compress
npm install
```

### Linting
```bash
# Vérifier le code
npm run lint

# Corriger automatiquement les erreurs
npm run lint:fix
```

### Configuration ESLint
Le projet utilise ESLint configuré pour Node.js avec :
- Environnement Node.js activé (`require`, `process`, `module`, etc.)
- Support CommonJS
- Console autorisée pour les scripts CLI

## 📝 Notes techniques

- Le script utilise VP9 avec mode 2-pass pour une compression optimale
- Les paramètres sont optimisés pour le streaming web
- Le codec Opus est utilisé pour l'audio (plus efficace que Vorbis)
- Parallélisme activé pour des performances optimales

---

Made for SX Tour Douai 🏍️
