

/*-----------------------------------*\
 * #Obtener el botón de cambio de tema
\*-----------------------------------*/
var toggleThemeButton = document.getElementById('toggle-theme');

toggleThemeButton.addEventListener('click', function () {
  // Se obtiene el elemento <body>
  var body = document.body;

  // Se alterna entre las clases 'dark' y 'light' en el <body>
  if (body.classList.contains('dark-theme')) {
    body.classList.remove('dark-theme');
    body.classList.add('light-theme');
    localStorage.setItem('theme', 'light'); // guardo el modo en el localstorage para usarlo en las demas ventanas
  } else {
    body.classList.remove('light-theme');
    body.classList.add('dark-theme');
    localStorage.setItem('theme', 'dark');
  }
});

  document.addEventListener('DOMContentLoaded', function () {
    // Verifico si hay un modo guardado en localstorage
    var savedTheme = localStorage.getItem('theme');
    var body = document.body;
  
    // Aplica el modo almacenado
    if (savedTheme === 'light') {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    } else if (savedTheme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    }
  });