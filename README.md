# Habby
Habby is a habit tracker written as a Vue + TypeScript single-page application for the Hack Club terra program.

The cards currently get saved locally in your browser's localStorage, and you can add and remove them on demand.

It allows you to create habits with inputs for name, interval and the type of interval (either minutes, hours or days) 
with a responsive UI that works nicely on all kinds of devices.

How it looks:
![img.png](images/img.png)

# How to use:

Quick use: visit **https://goldmonke.me/Habby/** which is hosted with github pages

To host it yourself:

Prerequisites:
`pnpm`

Then clone the repo to your device of choice, cd into the `client` folder and run `pnpm install`, and wait for it to install all dependencies. Then you can either run pnpm run dev to use it quickly, however to use it long term you should run `pnpm run build`.

Then host the files in the `dist` subfolder on your provider of choice (or your local device).