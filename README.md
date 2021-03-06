# Mail Helper

### Raison d`etre

This package is made to fetch the last email arrived in the Inbox of the configured email address. It exists because we needed this to test e2e flows where email is received by the user and he takes action accordingly.

```bash
$ npm i @mohuk/mail-helper
```

### Example

```js
import { MailHelper } from '@mohuk/mail-helper';

const helper = new MailHelper({
  user: '',
  password: '',
  host: '',
  port: '',
  tls: true
});

helper.connect()
  .then(() => helper.fetchLastEmail())
  .then((email: string) => {
    console.log(email);
  })
  .then(() => {
    helper.disconnect();
  })
  .catch((err) => {
    console.log(err)
  });
```
