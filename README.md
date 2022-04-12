<div id="top"></div>

<!-- KoBo-MRZ Project -->
<!--
*** Project Develop and maintain by Nawa Augustine
-->


<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/nawaaugustine/kobo-mrz">
    <img src="https://iihl.org/wp-content/uploads/2021/01/unhcr.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">KoBoToolBox MRZ-Scanner</h3>

  <p align="center">
    A bespoke solution for scanning MRZ-coded documents to extract data!
    <br />
    <br />
    <a href="https://user-images.githubusercontent.com/9056187/162946489-010bffb7-f355-4ae9-819d-41efccb5fcdf.mp4">View Demo</a>
    ·
    <a href="https://github.com/nawaaugustine/kobo-mrz/issues">Report Bug</a>
    ·
    <a href="https://github.com/nawaaugustine/kobo-mrz/issues">Request Feature</a>
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#build">Build</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#example">Example</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>


<!-- ABOUT THE PROJECT -->
## About The Project
<img src="https://user-images.githubusercontent.com/9056187/162921209-d0b09c0c-fda8-4c84-9d58-eb0ec41e2aa2.jpg" width="400px" height="800px" align="right">

At the DIMA in the UNHCR Asia and Pacific Regional Bureau, we have developed a bespoke KoBo integration that allows data to be extracted from an MRZ-enabled document and imported into KoBo. This automated approach was created to limit the risk of mistakes during a Rapid Assessment conducted in AFG. The objective is to collect the POCs' Name, Family Name, Age, and Gender by automatically reading the data from their national ID cards and saving it in KoBo. <br>

This application configures an Android intent. Intents are messaging objects used to request an action from another app component. Learn more in the [Android docs](https://developer.android.com/guide/components/intents-filters.html).

Key Features:
* Integrates with [KoBoCollect](https://kobo.unhcr.org/) and [ODKCollect](https://getodk.org/)
* Works 100% offline
* Pulls data from MRZ documents with capability to read other document types as well :smile:

This is a template solution, no one KoBo form will serve all projects since your needs may be different (See [Usage](<a href="#usage">Usage</a>) for information on how to adapt this code for a different KoBo form). You may suggest changes by forking this repo and creating a pull request or opening an issue.


### Built With

List of all major frameworks/libraries used to develop this project.

* [IONIC](https://ionicframework.com/)
* [MicroBlink SDK](https://microblink.com/)
* [Capacitorjs](https://capacitorjs.com/)
* [Angular](https://angular.io/)
* [Node.js](https://nodejs.org/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these steps.

### Prerequisites

_Required resources and how to install and build them._

* [Download the installer](https://nodejs.org/) for Node LTS.
* Install the ionic CLI globally
  ```sh
  npm install -g ionic
  ```

### Installation

_Below is the instructions on installing and setting up the scanner app._

1. Get a 30-day MicroBlink SDK trial Key at [https://microblink.com/](https://microblink.com/)
2. Clone the repo
   ```sh
   git clone https://github.com/nawaaugustine/kobo-mrz.git
   ```
3. Install NPM packages from your project root
   ```sh
   npm install
   ```
4. Enter your MicroBlink SDK key in `./src/app/scanner/scanner.page.ts`
   ```js
   android: '<your_android_license>';
   ```

### Build
_See the instructions on the usage below before building._

* Run `ionic build --prod`
* Run `npx cap copy`
* Run `npx cap sync`
* Run `npx cap open android` ensure you already have android studio installed
* Goto your android studio and build the APK
* Enjoy! :tada:

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

The below code change is required in other to adabt this template to your KoBo form.

1. Change values in `./src/app/plugins/LauncherActivity.ts`. The new values should match exactly your KoBo data name labels
![code](https://user-images.githubusercontent.com/9056187/162917864-4261686a-e4a3-46fe-8499-5dbc14ea9b73.png)

2. Change values assignment in `./src/app/scanner/scanner.page.ts`
![code2](https://user-images.githubusercontent.com/9056187/162918756-2f323813-71a9-4ed3-b59e-1cea01975a5c.png)

3. Pass assigned values to main andriod activity in `./android/app/src/main/java/io/nawa/kobo/mrz/LauncherActivity.java`
![code3](https://user-images.githubusercontent.com/9056187/162919265-001f5dd9-f263-461e-aea8-35e8f93b8f14.png)

4. Recieve and push values to KoBo in `./android/app/src/main/java/io/nawa/kobo/mrz/MainActivity.java`
![code4](https://user-images.githubusercontent.com/9056187/162919959-14a25c9f-cad3-4d25-adbf-d32103488a51.png)


<p align="right">(<a href="#top">back to top</a>)</p>



<!-- EXAMPLES -->
## Example
#### Example of an external apps to populate multiple fields in KoBo
KoBo `field-list` group can have an intent attribute that allows an external application to populate it.

### XLSForm

| type          | name             | label              | appearance   | body::intent   
| ------------- | ---------------- | ------------------ | -----------  | ----------------- 
| begin_group   | `mygroup`        | Fields to populate | `field-list` | `io.nawa.kobo.mrz`
| `text`        | `Tazkira_no_001` | ID Number          |              |
| `text`        | `name`           | First Name         | 
| `text`        | `father_name`    | Family Name        | 
| `integer`     | `hhh_age`        | Age                | 
| `text`        | `hhh_gender`     | Gender             | 
| end_group


### Signed APK
Download the signed example APK  [here](https://unhcr365-my.sharepoint.com/personal/nawaa_unhcr_org/_layouts/15/onedrive.aspx?id=%2Fpersonal%2Fnawaa%5Funhcr%5Forg%2FDocuments%2FAPK%2FKoBo%2DMRZ%2Drelease%2Eapk&parent=%2Fpersonal%2Fnawaa%5Funhcr%5Forg%2FDocuments%2FAPK&ga=1). Tested successfully on android version 8+ 

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [ ] Add Changelog
- [ ] Make value addition dynamic based on the value passed to the method
- [ ] Add a modal to preview scanned data before sending to KoBo?
- [ ] Support for data extraction from QRCode/BareCode
- [ ] Support for data extraction from other document types
- [ ] Remove scanning capability if scanner app is not launched from KoBo
- [ ] Multi-language Support?
    - [ ] French
    - [ ] Spanish
    - [ ] Arabic

See the [open issues](https://github.com/nawaaugustine/kobo-mrz/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Added some Amazing Feature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Augustine Nawa - [@nawaaugustine](https://twitter.com/nawaaugustine) - nawaaugustine@gmail.com

Project Link: [https://github.com/nawaaugustine/kobo-mrz](https://github.com/nawaaugustine/kobo-mrz/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments

Some useful resources
* [Launching External Apps](https://docs.getodk.org/launch-apps-from-collect/)
* [Intents and Intent Filters](https://developer.android.com/guide/components/intents-filters.html)

<p align="right">(<a href="#top">back to top</a>)</p>
