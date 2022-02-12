let sesion = false;

module.exports = {
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