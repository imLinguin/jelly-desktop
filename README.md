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

We also used pure CSS in it. The app is fully responsive and has a consistent design with the Jellyfin browser version.

<br>

### **General operations of the app**

During the first run, the program will ask the user for the IP address, port and display all servers with Jellyfin in the local network. After the connection is established, the data will be saved and the user won't have to enter it again the next time the app is started.

<br>

### **Searching for the servers in the LAN**

TODO

<br>

# **Installation**

Below is a step by step installation process for different operating systems (and Linux distros).

<br>

### **Windows**
1. Download the file with the `.exe` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
2. Run the installer.
3. Installation requires no user interaction or administrator privileges.
4. Before starting, check any [problems](#known-issues) that may occur.

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

- `apt`
  - Install the package using the commands below:
     ```
     $ sudo add-apt-repository ppa:imLinguin/jelly-desktop
     ```
     ```
     $ sudo apt update
     ```
     ```
     $ sudo apt install jelly-desktop
     ```

<br>

- `AUR (Arch User Repository)`
  - https://aur.archlinux.org/packages/jelly-desktop/

<br>

### **macOS**
1. Download the file with the `.dmg` extension from the latest [Release](https://github.com/imLinguin/jelly-desktop/releases/latest).
2. Run the installer.
3. Move the Jelly Desktop icon to the Applications folder icon.
4. Before starting, check any [problems](#known-issues) that may occur.

<br>

# **Updating**

Jelly Desktop installed from files: `.exe`, `.AppImage`, `.dmg` is automatically updated.

<br>

# **Contributing**

<br>

# **Known Issues**

<br>

# **Authors**

<br>

# **Screenshots**