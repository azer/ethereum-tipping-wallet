# ethereum-tipping-wallet

A browser extension for tipping web pages by sending Ethereum directly. Check out the screenshot below:

![](https://cldup.com/6NvYSop4Ut.png)

## How does it work ? 

Define your wallet inside <meta> fields in your web page:

```html
<meta name="wallet:currency" content="eth"/>
<meta name="wallet:address" content="0xa7Cc46D14E5c4Fa84F77fcCce98F36D1040B207D"/>
<meta name="wallet:title" content="Azer Koçulu"/>
<meta name="wallet:recommended_amount" content="0.1"/>
<meta name="wallet:description" content="I love building software, shooting photographs and writing."/>
<meta name="wallet:image" content="https://cldup.com/A-XFtZUANM.jpg"/>
```

Boom! Now your website can receive tips in the cryptocurrency that you prefer. This extension currently supports only Ethereum, I'd like to implement support for Bitcoin in the future.

## Is it safe?

I'm not sure! So, I suggest using new wallets. The extension already has options to create wallets easily. 

## Is it ready ?

It's pointing to testnet (Rinkeby) and it's not released in the Chrome Web Store yet. I'll do that after finishing the rest of the user dialogs.

# How can I (use|develop) it?


```
λ  make help

  Choose a command:

  help                 Show help and exit
  build                Build everything into 'dist' folder.
  chrome/build         Build Chrome extension files
  background/compile   Compile TypeScript into JavaScript
  background/watch     Watch for changes and compile
  content/compile      Compile TypeScript into JavaScript
  content/watch        Watch for changes and compile
  popup/compile        Compile TypeScript into JavaScript
  popup/watch          Run `make compile` at every change. (github.com/azer/yolo required)
```

TODO
