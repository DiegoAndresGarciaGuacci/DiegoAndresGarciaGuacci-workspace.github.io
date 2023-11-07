(() => {
    'use strict'
  
    
    const forms = document.querySelectorAll('.needs-validation') // selecciona elementos q tenga la class needs-validation y los guarda en la const forms
  
    
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()//hace q no se reenvie
          event.stopPropagation()//evita la propagacion del propio evento
        }
  
        form.classList.add('was-validated')//agrega la clase al form para decir que fue validado
      }, false)
    })
  })()