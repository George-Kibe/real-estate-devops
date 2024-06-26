### Installing Chrome into a VPS

#### Update and install
```sudo apt-get update && apt-get install```

#### Fix installations
```sudo apt-get install -f```

#### Install dependencies
```sudo apt-get install -y fonts-liberation libasound2 libatk-bridge2.0-0 libatk1.0-0 libatspi2.0-0 libcairo2 libcups2 libgbm1 libgtk-3-0 libpango-1.0-0 libu2f-udev libvulkan1 libxcomposite1 libxdamage1 libxfixes3 libxkbcommon0 libxrandr2 xdg-utils fontconfig libharfbuzz0b libthai0 libxrender1```

#### Install Chrome
```sudo dpkg -i google-chrome-stable_current_amd64.deb```

#### Confirm chrome is installed
```google-chrome```

#### Creating an instance of vnserver
```sudo apt-install && sudo apt-get update```
```sudo apt install xfce4 xfce4-goodies -y```
```sudo apt install tightvncserver -y```

#### installing a desktop Environment
```sudo apt update && sudo apt install xfce4 xfce4-goodies -y```

####
```sudo apt update && sudo apt install -y mesa-utils && sudo apt install -y libgl1-mesa-glx libx11-dev```