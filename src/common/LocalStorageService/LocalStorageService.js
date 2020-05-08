const LocalStorageService = (function(){
    var _service;
    function _getService() {
        if(!_service) {
          _service = this;
          return _service
      }
      return _service
    }
    function _setToken(token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', token);
    }
    function _getAccessToken() {
      return localStorage.getItem('access_token');
    }

    function _getRefreshToken() {
      return localStorage.getItem('refresh_token');
    }

    function _setAvatar(avatar){
       localStorage.setItem("avatar", avatar)
    }

    function _getAvatar(){
      return localStorage.getItem("avatar")
    }

    function _clearAvatar(){
      localStorage.removeItem("avatar")
    }

    function _clearToken() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
    }
    
   return {
      getService : _getService,
      setToken : _setToken,
      getAccessToken : _getAccessToken,
      getRefreshToken : _getRefreshToken,
      clearToken : _clearToken,
      setAvatar: _setAvatar,
      getAvatar: _getAvatar,
      clearAvatar: _clearAvatar
    }
   })();
   export default LocalStorageService;