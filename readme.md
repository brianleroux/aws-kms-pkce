# aws-kms-pkce 
> Generate PKCE Tokens with AWS KMS 🤔

Creates maximum strength Proof Key for Code Exchange (PKCE) tokens with Amazon Web Services Key Management Service (AWS KMS).

Tokens generated:

- Code Verifier
- Code Challenge

> Reference: https://tools.ietf.org/html/rfc7636

## Usage

```javascript
let pkce = require('kms-pkce')

pkce(console.log)
// logs: 
// { verification: 'U71xyrgCdS9liEF1MccBIzJ3TrjUXodUhj5fDN87kRQ',
//   challenge: '1ij4s9iMQ3AWuTRdRrKyDlgW7k3GZ1ds8TNJ8EKcgLY' }

```

An async friendly interface is also provided if you don't want to use callbacks.

```javascript
let pkce = require('kms-pkce')

async function main() {
  let tokens = await pkce()
  console.log(tokens)
}  

main()
// logs: 
// { verification: 'U71xyrgCdS9liEF1MccBIzJ3TrjUXodUhj5fDN87kRQ',
//   challenge: '1ij4s9iMQ3AWuTRdRrKyDlgW7k3GZ1ds8TNJ8EKcgLY' }

```
