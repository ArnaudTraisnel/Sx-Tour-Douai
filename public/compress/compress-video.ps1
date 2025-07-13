# Script PowerShell pour compresser des vidéos WebM
# Utilise le video-compressor.js avec une interface utilisateur améliorée

param(
    [Parameter(Position=0)]
    [string]$InputFile,
    
    [Parameter(Position=1)]
    [string]$OutputFile,
    
    [Parameter(Position=2)]
    [int]$Quality = 23,
    
    [switch]$Help
)

function Show-Help {
    Write-Host @"

🎬 Compresseur Vidéo WebM - PowerShell
======================================

UTILISATION:
    .\compress-video.ps1 [InputFile] [OutputFile] [Quality]
    .\compress-video.ps1 -Help

PARAMÈTRES:
    InputFile    Fichier vidéo source (.webm, .mp4, .avi, .mov)
    OutputFile   Fichier vidéo compressé de sortie (.webm)
    Quality      Niveau de qualité CRF (15-35, défaut: 23)

NIVEAUX DE QUALITÉ:
    15-20: Très haute qualité (fichier plus gros)
    20-25: Haute qualité (recommandé)
    25-30: Qualité moyenne (fichier plus petit)
    30-35: Basse qualité (très petit fichier)

EXEMPLES:
    .\compress-video.ps1 video.mp4 video-compressed.webm
    .\compress-video.ps1 video.webm video-optimized.webm 25
    .\compress-video.ps1 "C:\Videos\source.mp4" "C:\Output\compressed.webm" 20

PRÉREQUIS:
    - Node.js installé et dans le PATH
    - FFmpeg installé et dans le PATH

"@ -ForegroundColor Cyan
}

function Test-Prerequisites {
    Write-Host "🔍 Vérification des prérequis..." -ForegroundColor Yellow
    
    # Vérifier Node.js
    try {
        $nodeVersion = node --version 2>$null
        Write-Host "✅ Node.js détecté: $nodeVersion" -ForegroundColor Green
    } catch {
        Write-Host "❌ Node.js n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
        Write-Host "💡 Installez Node.js depuis: https://nodejs.org/" -ForegroundColor Yellow
        return $false
    }
    
    # Vérifier FFmpeg
    try {
        $ffmpegOutput = ffmpeg -version 2>$null | Select-Object -First 1
        Write-Host "✅ FFmpeg détecté" -ForegroundColor Green
    } catch {
        Write-Host "❌ FFmpeg n'est pas installé ou n'est pas dans le PATH" -ForegroundColor Red
        Write-Host "💡 Installez FFmpeg depuis: https://ffmpeg.org/download.html" -ForegroundColor Yellow
        Write-Host "💡 Ou utilisez: winget install Gyan.FFmpeg" -ForegroundColor Yellow
        return $false
    }
    
    return $true
}

function Get-UserInput {
    Write-Host "`n📂 Configuration de la compression" -ForegroundColor Cyan
    
    # Demander le fichier source
    do {
        $script:InputFile = Read-Host "Chemin du fichier vidéo source"
        if (-not (Test-Path $InputFile)) {
            Write-Host "❌ Le fichier n'existe pas. Veuillez réessayer." -ForegroundColor Red
        }
    } while (-not (Test-Path $InputFile))
    
    # Demander le fichier de sortie
    $script:OutputFile = Read-Host "Nom du fichier de sortie (avec extension .webm)"
    
    # Demander la qualité
    Write-Host "`n⚙️ Sélection de la qualité:" -ForegroundColor Cyan
    Write-Host "  15-20: Très haute qualité (gros fichier)" -ForegroundColor Gray
    Write-Host "  20-25: Haute qualité (recommandé)" -ForegroundColor Gray
    Write-Host "  25-30: Qualité moyenne (petit fichier)" -ForegroundColor Gray
    Write-Host "  30-35: Basse qualité (très petit fichier)" -ForegroundColor Gray
    
    do {
        $qualityInput = Read-Host "Niveau de qualité [23]"
        if ([string]::IsNullOrEmpty($qualityInput)) {
            $script:Quality = 23
            break
        } elseif ([int]::TryParse($qualityInput, [ref]$script:Quality) -and $Quality -ge 15 -and $Quality -le 35) {
            break
        } else {
            Write-Host "❌ Veuillez entrer un nombre entre 15 et 35." -ForegroundColor Red
        }
    } while ($true)
}

function Start-Compression {
    $scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
    $compressorPath = Join-Path $scriptPath "video-compressor.js"
    
    if (-not (Test-Path $compressorPath)) {
        Write-Host "❌ Le script video-compressor.js est introuvable dans: $scriptPath" -ForegroundColor Red
        return $false
    }
    
    Write-Host "`n🚀 Lancement de la compression..." -ForegroundColor Green
    Write-Host "📹 Source: $InputFile" -ForegroundColor Gray
    Write-Host "📁 Sortie: $OutputFile" -ForegroundColor Gray
    Write-Host "⚙️ Qualité: $Quality" -ForegroundColor Gray
    Write-Host ""
    
    try {
        & node $compressorPath $InputFile $OutputFile $Quality
        
        if ($LASTEXITCODE -eq 0) {
            Write-Host "`n✅ Compression terminée avec succès!" -ForegroundColor Green
            
            if (Test-Path $OutputFile) {
                $outputSize = (Get-Item $OutputFile).Length
                $inputSize = (Get-Item $InputFile).Length
                $savings = [math]::Round(($inputSize - $outputSize) / $inputSize * 100, 1)
                
                Write-Host "📊 Statistiques:" -ForegroundColor Cyan
                Write-Host "   Taille originale: $([math]::Round($inputSize / 1MB, 2)) MB" -ForegroundColor Gray
                Write-Host "   Taille compressée: $([math]::Round($outputSize / 1MB, 2)) MB" -ForegroundColor Gray
                Write-Host "   Économie: $savings%" -ForegroundColor Gray
            }
            
            return $true
        } else {
            Write-Host "`n❌ Erreur lors de la compression (Code: $LASTEXITCODE)" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host "`n❌ Erreur lors de l'exécution: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

# Script principal
if ($Help) {
    Show-Help
    exit 0
}

Write-Host @"
==========================================
   🎬 Compresseur Vidéo WebM - PowerShell
==========================================
"@ -ForegroundColor Cyan

# Vérifier les prérequis
if (-not (Test-Prerequisites)) {
    Read-Host "`nAppuyez sur Entrée pour quitter"
    exit 1
}

# Si les paramètres ne sont pas fournis, les demander
if ([string]::IsNullOrEmpty($InputFile) -or [string]::IsNullOrEmpty($OutputFile)) {
    Get-UserInput
}

# Valider les paramètres
if (-not (Test-Path $InputFile)) {
    Write-Host "❌ Le fichier source n'existe pas: $InputFile" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

if ($Quality -lt 15 -or $Quality -gt 35) {
    Write-Host "❌ La qualité doit être entre 15 et 35" -ForegroundColor Red
    Read-Host "Appuyez sur Entrée pour quitter"
    exit 1
}

# Lancer la compression
$success = Start-Compression

if ($success) {
    Write-Host "`n🎉 Processus terminé avec succès!" -ForegroundColor Green
} else {
    Write-Host "`n💥 Le processus a échoué." -ForegroundColor Red
}

Read-Host "`nAppuyez sur Entrée pour quitter"
