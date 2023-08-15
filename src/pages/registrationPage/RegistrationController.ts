export function showHidePassword(): void {
   const passEye = document.querySelector('.password-control');
   const input = document.querySelector('.input-password');

   passEye?.addEventListener('click', () => {
     // eslint-disable-next-line no-console
     console.log(passEye);
     // eslint-disable-next-line no-alert
     if (input?.getAttribute('type') === 'password') {
       passEye?.classList.add('no-view');
       input.setAttribute('type', 'text');
      } else {
       passEye?.classList.remove('no-view');
       input?.setAttribute('type', 'password');
      }
   })

 }

