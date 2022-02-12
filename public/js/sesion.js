let sesion = false;

// const setLog = function (){
//     sesion = true;
// }
// const isLoged = function(){
//     return sesion;
// };

module.exports = {
    // sesion: false,
    setLog: function() {
        sesion = true;
    },
    isLoged: function() {
        return sesion;
    },
    setLogout: function() {
        sesion = false;
    }
     
 }