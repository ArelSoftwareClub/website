@echo off
echo ========================================
echo  Arel Yazilim - GitHub Push Script
echo ========================================

REM GitHub'a push edilecek repo adresi
SET REPO_URL=https://github.com/ArelSoftwareClub/arel-yazilim-website.git

echo.
echo [1/5] Git repo baslatiliyor...
git init

echo.
echo [2/5] Remote ekleniyor: %REPO_URL%
git remote add origin %REPO_URL%

echo.
echo [3/5] Dosyalar ekleniyor...
git add .

echo.
echo [4/5] Commit yapiliyor...
git commit -m "feat: Arel Yazilim Kulubu resmi web sitesi ilk surumu

- Hero section: Animasyonlu beyin logosu, orbital efektler, istatistikler
- Hakkimizda: Misyon, vizyon, topluluk + ozellik kartlari
- Odak Alanlari: Yazilim, Yapay Zeka, Veri Bilimi
- Etkinlikler: Zaman cizelgesi (gecmis + yaklasmakta)
- Projeler: GitHub baglantisi + teknoloji marquee
- Iletisim: 6 sosyal medya butonu + iletisim formu
- Tam responsive (mobil/tablet/masaustu)
- Dark theme + glassmorphism tasarim"

echo.
echo [5/5] GitHub'a push ediliyor...
git branch -M main
git push -u origin main

echo.
echo ========================================
echo  TAMAMLANDI! Repo'ya yuklendi.
echo  https://github.com/ArelSoftwareClub/arel-yazilim-website
echo ========================================
pause
