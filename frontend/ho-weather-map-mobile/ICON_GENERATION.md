# HO Weather Map - Icon Generation Guide

To generate app icons for the HO Weather Map Android app, you'll need:

1. A logo image (PNG or SVG) of at least 512x512 pixels
2. Generate icons for the following densities:
   - mdpi: 48x48
   - hdpi: 72x72
   - xhdpi: 96x96
   - xxhdpi: 144x144
   - xxxhdpi: 192x192

## Quick Generation (Windows PowerShell)

Place your logo image at `android/app/src/main/res/logo.png` (512x512 minimum), then run:

```powershell
[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

$logo = [System.Drawing.Image]::FromFile("logo.png")
$sizes = @(@{name="mdpi"; size=48}, @{name="hdpi"; size=72}, @{name="xhdpi"; size=96}, @{name="xxhdpi"; size=144}, @{name="xxxhdpi"; size=192})

foreach ($size in $sizes) {
    $bitmap = New-Object System.Drawing.Bitmap($size.size, $size.size)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    $graphics.Clear([System.Drawing.Color]::White)
    
    # Center the logo
    $padding = [Math]::Floor($size.size * 0.19)
    $newWidth = $size.size - (2 * $padding)
    $newHeight = [Math]::Floor($logo.Height * $newWidth / $logo.Width)
    $topPadding = [Math]::Floor(($size.size - $newHeight) / 2)
    
    $graphics.DrawImage($logo, $padding, $topPadding, $newWidth, $newHeight)
    $graphics.Dispose()
    
    $bitmap.Save("android/app/src/main/res/mipmap-$($size.name)/ic_launcher.png")
    $bitmap.Dispose()
}

$logo.Dispose()
```

After generating, rebuild the app with Gradle to use the new icons.

## Using Android Studio

Alternatively, use Android Studio's built-in icon generator:

1. Right-click on `android/app/src/main/res/` → New → Image Asset
2. Select your logo and configure for each density
3. Android Studio will generate all required sizes automatically
