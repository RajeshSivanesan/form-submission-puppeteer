import { Injectable } from '@nestjs/common';
import puppeteer from 'puppeteer';
import * as fs from 'fs';

const mockData = {
  name: "Test Name",
  email: "test@gmail.com",
  merekName: "test merek name",
  nomor_registrasi: "test nomor",
  nama_pemilik: 'test nama_pemilik',
  pemilik_haki_: "Iya (Yes)",
  hubungan_pelapor: 'test hubungan_pelapor',
  nama_perusahaan: 'test nama_perusahaan',
  website_perusahaan: 'website_perusahaan',
  alamat_perusahaan: 'alamat_perusahaan',
  alamat_email_pemilik_merek: 'test@gmail.com',
  no_telepon_pelapor: 9191718119,
  link_barang: 'link_barang',
  body: 'testing body testing body testing body'
};

const DEFAULT_ARGS = [
  '--disable-background-networking',
  '--enable-features=NetworkService,NetworkServiceInProcess',
  '--disable-background-timer-throttling',
  '--disable-backgrounding-occluded-windows',
  '--disable-breakpad',
  '--disable-client-side-phishing-detection',
  '--disable-component-extensions-with-background-pages',
  '--disable-default-apps',
  '--disable-dev-shm-usage',
  '--disable-extensions',
  // BlinkGenPropertyTrees disabled due to crbug.com/937609
  '--disable-features=TranslateUI,BlinkGenPropertyTrees',
  '--disable-hang-monitor',
  '--disable-ipc-flooding-protection',
  '--disable-popup-blocking',
  '--disable-prompt-on-repost',
  '--disable-renderer-backgrounding',
  '--disable-sync',
  '--force-color-profile=srgb',
  '--metrics-recording-only',
  '--no-first-run',
  '--enable-automation',
  '--password-store=basic',
  '--use-mock-keychain',
];

@Injectable()
export class AppService {
  postForm(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const browser = await puppeteer.launch({
          headless: false,
          args: ['--lang=en-US,en',
            '--enable-audio-service-sandbox',
            '--no-sandbox',
          ],
          executablePath: null,
          userDataDir: "E:\\",
          ignoreDefaultArgs: DEFAULT_ARGS,
        });
        const page = await browser.newPage();

	      await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

        await page.goto('https://bukabantuan.bukalapak.com/form/175', {
          waitUntil: 'networkidle2'
        });

        await page.focus("input[name='name']");
        await page.keyboard.type(mockData.name);

        await page.focus('input[name=email]');
        await page.keyboard.type(mockData.email);

        await page.focus('input[name=merek]');
        await page.keyboard.type(mockData.merekName);

        await page.focus('input[name=nomor_registrasi]');
        await page.keyboard.type(mockData.nomor_registrasi);

        await page.focus('input[name=nama_pemilik]');
        await page.keyboard.type(mockData.nama_pemilik);

        const radiobtns = await page.$$('input[name=pemilik_haki_]');
        await radiobtns[0].click();

        await page.focus('input[name=hubungan_pelapor]');
        await page.keyboard.type(mockData.hubungan_pelapor);

        await page.focus('input[name=nama_perusahaan]');
        await page.keyboard.type(mockData.nama_perusahaan);

        await page.focus('input[name=website_perusahaan]');
        await page.keyboard.type(mockData.website_perusahaan);

        await page.focus('input[name=alamat_perusahaan]');
        await page.keyboard.type(mockData.alamat_perusahaan);

        await page.focus('input[name=alamat_email_pemilik_merek]');
        await page.keyboard.type(mockData.alamat_email_pemilik_merek);

        await page.focus('input[name=no_telepon_pelapor]');
        await page.keyboard.type(String(mockData.no_telepon_pelapor));

        await page.focus('input[name=link_barang]');
        await page.keyboard.type(mockData.link_barang);

        await page.focus('textarea[name=body]');
        await page.keyboard.type(mockData.body);

        const fileToUpload = {
          name: 'pexels-photo-276267.jpeg',
          content: fs.readFileSync(process.cwd() + '\\src\\pexels-photo-276267.jpeg').toString(),
          mimeType: 'text/plain', // This will depend on your case
        }
        
        await page.evaluate(async (fileToUpload) => {
          const b = new Blob([fileToUpload.content], { type: fileToUpload.mimeType })
          const dt = new DataTransfer();
          dt.items.add(new File([b], fileToUpload.name));
        
          const ele = document.querySelectorAll('input[type=file]')[0];
          //@ts-ignore
          ele.files = dt.files;
          ele.dispatchEvent(new Event('input', { bubbles: true }));
          ele.dispatchEvent(new Event('change', { bubbles: true }));

          const ele1 = document.querySelectorAll('input[type=file]')[1];
          //@ts-ignore
          ele1.files = dt.files;
          ele1.dispatchEvent(new Event('input', { bubbles: true }));
          ele1.dispatchEvent(new Event('change', { bubbles: true }));
        }, fileToUpload);

        const checkbox = await page.$$('input[type=checkbox]');
        await checkbox[0].click();

        await page.click('button[type=submit]');

        resolve('success');
      } catch (ex) {
        reject(ex);
      }
    });
  }
}
