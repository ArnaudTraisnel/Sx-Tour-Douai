@echo off
setlocal enabledelayedexpansion

:: Script batch pour compresser des vidéos WebM
:: Facilite l'utilisation du video-compressor.js sur Windows

echo.
echo ==========================================
echo     Compresseur Video WebM - Windows
echo ==========================================
echo.

:: Vérifier si Node.js est installé
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js n'est pas installé ou n'est pas dans le PATH
    echo 💡 Installez Node.js depuis: https://nodejs.org/
    pause
    exit /b 1
)

:: Vérifier si FFmpeg est installé
ffmpeg -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ FFmpeg n'est pas installé ou n'est pas dans le PATH
    echo 💡 Installez FFmpeg depuis: https://ffmpeg.org/download.html
    echo 💡 Ou utilisez: winget install Gyan.FFmpeg
    pause
    exit /b 1
)

:: Si aucun argument n'est fourni, demander les paramètres
if "%~1"=="" (
    echo Sélectionnez le fichier vidéo à compresser:
    set /p "input_file=Chemin du fichier source: "
    
    echo.
    echo Nom du fichier de sortie (avec extension .webm):
    set /p "output_file=Fichier de sortie: "
    
    echo.
    echo Niveau de qualité (15-35, défaut 23):
    echo - 15-20: Très haute qualité (gros fichier)
    echo - 20-25: Haute qualité (recommandé)
    echo - 25-30: Qualité moyenne (petit fichier)
    echo - 30-35: Basse qualité (très petit fichier)
    set /p "quality=Qualité [23]: "
    
    if "!quality!"=="" set quality=23
) else (
    set "input_file=%~1"
    set "output_file=%~2"
    set "quality=%~3"
    if "!quality!"=="" set quality=23
)

:: Vérifier que le fichier d'entrée existe
if not exist "!input_file!" (
    echo ❌ Le fichier source n'existe pas: !input_file!
    pause
    exit /b 1
)

:: Exécuter le compresseur
echo.
echo 🚀 Lancement de la compression...
echo.

node "%~dp0video-compressor.js" "!input_file!" "!output_file!" !quality!

if %errorlevel% equ 0 (
    echo.
    echo ✅ Compression terminée avec succès!
    echo 📁 Fichier créé: !output_file!
) else (
    echo.
    echo ❌ Erreur lors de la compression
)

echo.
pause
