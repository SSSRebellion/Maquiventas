import React, { useState } from 'react';

export default function AuthModals({
    loginModalOpen,
    registerModalOpen,
    onCloseLogin,
    onCloseRegister,
    onLogin,
    onRegister,
    onSwitchToRegister,
    onSwitchToLogin
}) {
    const [loginEmail, setLoginEmail] = useState('cliente@maqui.com');
    const [loginPass, setLoginPass] = useState('1234');

    const [regName, setRegName] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPass, setRegPass] = useState('');

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        onLogin(loginEmail, loginPass);
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        onRegister(regName, regEmail, regPass);
    };

    return (
        <>
            {/* Modal de Inicio de Sesión */}
            {loginModalOpen && (
                <div className="modal-backdrop open" onClick={onCloseLogin}>
                    <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Iniciar Sesión</h3>
                            <button type="button" className="btn-close" onClick={onCloseLogin}>&times;</button>
                        </div>
                        <form onSubmit={handleLoginSubmit}>
                            <div className="modal-body" style={{ padding: '1.2rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Correo Electrónico</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="form-control" 
                                        value={loginEmail}
                                        onChange={(e) => setLoginEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Contraseña</label>
                                    <input 
                                        type="password" 
                                        id="password" 
                                        className="form-control" 
                                        value={loginPass}
                                        onChange={(e) => setLoginPass(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div style={{ fontSize: '0.8rem', color: 'var(--gray-400)', background: 'var(--gray-900)', padding: '0.6rem', borderRadius: '4px' }}>
                                    <strong>Demo Cuentas:</strong><br/>
                                    Cliente: <code>cliente@maqui.com</code> / <code>1234</code><br/>
                                    Admin: <code>admin@maqui.com</code> / <code>admin</code>
                                </div>
                            </div>
                            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button type="button" className="btn btn-outline" onClick={onSwitchToRegister} style={{ fontSize: '0.85rem' }}>
                                    Crear Cuenta
                                </button>
                                <button type="submit" className="btn btn-primary" id="btn-login-submit">
                                    Ingresar al Sistema
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Registro de Usuario (CU-02) */}
            {registerModalOpen && (
                <div className="modal-backdrop open" onClick={onCloseRegister}>
                    <div className="modal-container modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3 className="modal-title">Registro de Nuevo Cliente (CU-02)</h3>
                            <button type="button" className="btn-close" onClick={onCloseRegister}>&times;</button>
                        </div>
                        <form onSubmit={handleRegisterSubmit}>
                            <div className="modal-body" style={{ padding: '1.2rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Nombre Completo o Razón Social</label>
                                    <input 
                                        type="text" 
                                        id="reg-name" 
                                        className="form-control" 
                                        placeholder="Ej. Constructora Andina S.A.S." 
                                        value={regName}
                                        onChange={(e) => setRegName(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Correo Electrónico Corporativo</label>
                                    <input 
                                        type="email" 
                                        id="reg-email" 
                                        className="form-control" 
                                        placeholder="contacto@constructora.com" 
                                        value={regEmail}
                                        onChange={(e) => setRegEmail(e.target.value)}
                                        required 
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Contraseña de Acceso</label>
                                    <input 
                                        type="password" 
                                        id="reg-password" 
                                        className="form-control" 
                                        placeholder="Mínimo 4 caracteres" 
                                        value={regPass}
                                        onChange={(e) => setRegPass(e.target.value)}
                                        required 
                                    />
                                </div>
                            </div>
                            <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <button type="button" className="btn btn-outline" onClick={onSwitchToLogin} style={{ fontSize: '0.85rem' }}>
                                    Ya tengo cuenta
                                </button>
                                <button type="submit" className="btn btn-primary" id="btn-register-submit">
                                    Registrarme e Ingresar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
