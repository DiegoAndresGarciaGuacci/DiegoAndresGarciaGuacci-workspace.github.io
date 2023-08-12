const 
$submit= document.getElementById("submit"),
$password= document.getElementById("password"),
$username= document.getElementById("username");

document.addEventListener("click", (e)=>{
    if(e.target === $submit){
        if($password.value !== "" && $username.value !== ""){
            e.preventDefault();
            window.location.href = "index.html";
        }

    }
})


