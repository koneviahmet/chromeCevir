let text = '<link rel="preload" href="/assets/css/0.styles.4aa3ae90.css" as="style">';


//let regex = "\\b^([a-zA-z0-9])([ ])?A?a?hmet\\b"
let regex = "\\bA?a?s([.,?])? \\b"
//let regex = "ahmet^([a-zA-z0-9])"
let rText = text.replace(RegExp(regex,'g'), "olarak ")

console.log(rText);
 