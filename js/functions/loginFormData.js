import Base64 from 'base-64'

export default loginFormData = (grantType, scope, uid, pwd) => {

    let formData = new FormData();
    formData.append('grant_type', grantType);
    formData.append('scope',scope );
    formData.append('username', uid);
    formData.append('password', pwd);

    return formData
}