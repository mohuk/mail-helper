import * as Imap from 'imap';

export class MailHelper {
  connection: Imap;
  constructor(config: Imap.Config){
    this.connection = new Imap(config);
    this.connection.connect();
  }

  connect(): Promise<boolean>{
    return new Promise((resolve, reject) => {
      this.connection.once('ready', () => {
        console.log('ready');
        resolve(true);
      });

      this.connection.on('error', (error) => {
        reject(error);
      });

      this.connection.on('disconnect', () => {
        reject('disconnected');
      })
    });
  }

  fetchLastEmail(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.connection.openBox('INBOX', true, (err, box: Imap.Box) => {
        if(err){
          reject(err);
        }
        //fetch entire message
        let fetch = this.connection.seq.fetch(box.messages.total + ':*', { bodies: [''] });
        fetch.on('message', (msg: Imap.ImapMessage, seqno: number) => {
          msg.on('body', (stream : NodeJS.ReadableStream, info : Object) => {
            let buffer: string;
            stream.on('data', (chunk : Buffer) => {
              buffer += chunk.toString('utf8');
            });

            stream.once('end', () => {
              this.connection.end();
              resolve(buffer);
            });
          })
        })
      });
    });
  }
}
