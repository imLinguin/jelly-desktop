<p align="center"><img src="images/logo.svg" width="300"></p>

---

<h3 align="center">Simple community made desktop client for Jellyfin</h3>

---

<br>

# **Description**

Jelly Desktop is an improved alternative to [Jellyfin Desktop](https://github.com/jellyfin-archive/jellyfin-desktop) app which is no longer supported. Through it, users can connect to servers with Jellyfin and use all its features, even if they don't know its IP address and port.

<br>

### **Technologies used**
Like its older counterpart, Jelly Desktop was created using [ElectronJS](https://www.electronjs.org/). We used [electron-builder](https://www.npmjs.com/package/electron-builder) to build the app, and the [electron-updater](https://www.npmjs.com/package/electron-updater) for automatic updates.
<br>
The app is fully responsive and has a consistent design with the Jellyfin browser version.

<br>

# **Installation**

Below is a step by step installation process for different operating systems (and Linux distros). <br>
Jelly Desktop installed from files: `.exe`, `.AppImage`, `.dmg` is automatically updated.

<br>

### **Windows**
1. Download the file with the `.exe` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
2. Run the installer.
3. Installation requires no user interaction or administrator privileges.

<br>

### **Linux**
- `.deb`
  1. Download the file with the `.deb` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo dpkg -i ./file-name.deb
     ```

<br>

- `.rpm`
  1. Download the file with the `.rpm` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo rpm -i ./file-name.rpm
     ```

<br>

- `.pacman`
  1. Download the file with the `.pacman` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
  2. Install the package using the command:
     ```
     $ sudo pacman -U ./file-name.pacman
     ```

<br>

- `.AppImage`
  1. Download and install [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher) from the latest [Release](https://github.com/TheAssassin/AppImageLauncher/releases/latest).
  2. Download the file with the `.AppImage` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
  3. Run the file downloaded in the second step and click the **Integrate and run** button.

<br>

- `AUR (Arch User Repository)`
  - https://aur.archlinux.org/packages/jelly-desktop/

<br>

### **macOS**
1. Download the file with the `.dmg` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
2. Run the installer.
3. Move the Jelly Desktop icon to the Applications folder icon.

<br>

# **Known Issues**
- ### **Windows**
  - The system gives a warning (screenshot below) when trying to run the installer. This is due to the lack of a certificate.
    <br>
    To overcome this problem, click: `More info` and then `Run anyway`. <br><br>
    ![Microsoft Certificate](https://user-images.githubusercontent.com/74045117/129968736-fa7d7e55-2cbc-4f4b-a383-fc304851c877.png)

- ### **macOS**
  - When Jelly Desktop is launched for the first time, the system displays a window (screenshot below) that prevents the app from opening. To fix it, go to: `System Preferences => Security & Privacy => General`. <br><br>
    When opening the program, you'll be presented with the option `Open Anyway`, which you must select to use our project. Then you only need to confirm by clicking the `Open` button. This problem only occurs after installation and is caused by missing Apple certificate. <br><br>
    ![Apple Certificate](https://user-images.githubusercontent.com/74045117/129964298-31f34cd3-1e09-491e-9fc0-5f50db0b0527.png)

<br>

# **Authors**
- Paweł Lidwin - [@imLinguin](https://github.com/imLinguin)
- Olek Baran - [@olek-arsee](https://github.com/olek-arsee)
- Konrad Zwierzchowski - [@OnlyPlayy](https://github.com/OnlyPlayy)
