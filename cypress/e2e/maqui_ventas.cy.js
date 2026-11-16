/**
 * SUITE DE PRUEBAS E2E CYPRESS - MAQUI VENTAS
 * Cobertura de Casos de Uso según documento PPI:
 * - CU-01: Autenticación / Inicio de Sesión
 * - CU-02: Registro de Nuevos Clientes
 * - CU-04: Catálogo de Maquinaria y Filtros
 * - CU-05: Proceso de Compra y Factura Comercial Formal
 * - CU-09: Gestión de Inventario Administrador (Alta de Maquinaria)
 * - Eliminación segura con Modal de Confirmación
 */

describe('SISTEMA MAQUI VENTAS - PRUEBAS END-TO-END (CYPRESS)', () => {

  beforeEach(() => {
    // Visita la página principal antes de cada prueba
    cy.visit('/maqui_ventas_demo.html');
  });

  // ==========================================================================
  // 1. CASO DE USO CU-01: INICIO DE SESIÓN
  // ==========================================================================
  context('CU-01: Inicio de Sesión', () => {
    it('Debe rechazar credenciales inválidas y mostrar un toast de error', () => {
      cy.loginAs('correo_falso@maqui.com', 'clave_erronea');

      // Verifica notificación toast de error
      cy.get('.toast.toast-error')
        .should('be.visible')
        .and('contain', 'Error de Autenticación');

      // Las secciones privadas deben permanecer ocultas
      cy.get('#client-section').should('have.class', 'hidden');
      cy.get('#admin-section').should('have.class', 'hidden');
    });

    it('Debe iniciar sesión como Cliente y cargar el Catálogo', () => {
      cy.loginAs('cliente@maqui.com', '1234');

      // Verifica que el login desaparezca y se muestre la vista de cliente
      cy.get('#login-section').should('have.class', 'hidden');
      cy.get('#client-section').should('not.have.class', 'hidden');
      
      // Barra de navegación con usuario y rol
      cy.get('#user-nav').should('be.visible');
      cy.get('#nav-user-name').should('contain', 'Cliente');
      cy.get('#nav-user-role').should('contain', 'Cliente');

      // Notificación toast de bienvenida
      cy.get('.toast.toast-success').should('be.visible');
    });

    it('Debe iniciar sesión como Administrador y cargar el Panel de Inventario', () => {
      cy.loginAs('admin@maqui.com', 'admin');

      cy.get('#login-section').should('have.class', 'hidden');
      cy.get('#admin-section').should('not.have.class', 'hidden');
      cy.get('#nav-user-role').should('contain', 'Administrador');
      cy.get('.admin-table').should('be.visible');
    });

    it('Debe permitir cerrar sesión correctamente y volver al login', () => {
      cy.loginAs('cliente@maqui.com', '1234');
      cy.logoutUser();

      cy.get('#login-section').should('not.have.class', 'hidden');
      cy.get('#client-section').should('have.class', 'hidden');
      cy.get('#user-nav').should('have.class', 'hidden');
    });
  });

  // ==========================================================================
  // 2. CASO DE USO CU-02: REGISTRO DE NUEVO USUARIO
  // ==========================================================================
  context('CU-02: Registro de Nuevos Usuarios', () => {
    it('Debe permitir registrar una cuenta nueva e iniciar sesión automáticamente', () => {
      const uniqueEmail = `cliente_${Date.now()}@constructora.com`;
      const clientName = 'Ingeniería & Maquinaria SAS';

      cy.registerUser(clientName, uniqueEmail, 'segura1234');

      // Toast de éxito en registro
      cy.get('.toast.toast-success')
        .should('be.visible')
        .and('contain', 'Registro Exitoso');

      // Debe loguear directamente y mostrar el catálogo
      cy.get('#client-section').should('not.have.class', 'hidden');
      cy.get('#nav-user-name').should('contain', clientName);
      cy.get('#nav-user-role').should('contain', 'Cliente');
    });

    it('Debe bloquear el registro si el correo ya existe en el sistema', () => {
      // Intentar registrar el email de cliente existente
      cy.registerUser('Cliente Duplicado', 'cliente@maqui.com', '1234');

      cy.get('.toast.toast-error')
        .should('be.visible')
        .and('contain', 'Usuario Ya Existe');
    });
  });

  // ==========================================================================
  // 3. CASO DE USO CU-04 Y CU-05: CATÁLOGO Y FACTURACIÓN COMERCIAL
  // ==========================================================================
  context('CU-04 & CU-05: Catálogo y Facturación Formal', () => {
    beforeEach(() => {
      cy.loginAs('cliente@maqui.com', '1234');
    });

    it('CU-04: Debe listar equipos con diseño industrial y permitir búsqueda por texto', () => {
      // Debe haber tarjetas de maquinaria cargadas
      cy.get('.machine-card').should('have.length.at.least', 3);

      // Probar filtro de búsqueda en tiempo real
      cy.get('#catalog-search').type('Caterpillar');
      cy.get('.machine-card').each(($card) => {
        cy.wrap($card).should('contain', 'Caterpillar');
      });

      // Limpiar búsqueda y recuperar listado completo
      cy.get('#catalog-search').clear();
      cy.get('.machine-card').should('have.length.at.least', 3);
    });

    it('CU-05: Debe procesar compra, descontar stock y desplegar Modal de Factura Comercial', () => {
      // Ubica la primera tarjeta de maquinaria
      cy.get('.machine-card').first().within(() => {
        cy.get('.machine-name').invoke('text').as('selectedMachineName');
        cy.get('.price-amount').invoke('text').as('selectedMachinePrice');
        // Hacer clic en Comprar
        cy.contains('Comprar y Facturar').click();
      });

      // Verificar que el modal de Factura esté visible y activo
      cy.get('#invoice-modal').should('have.class', 'active');
      cy.get('#invoice-modal-content').should('be.visible');

      // Validar datos exigidos en CU-05
      cy.get('.invoice-stamp').should('contain', 'PAGADO');
      cy.get('#inv-number').should('contain', 'FAC-2026-');
      cy.get('#inv-date').should('not.be.empty');
      cy.get('#inv-customer-name').should('contain', 'Cliente');
      
      // Validar coincidencia de producto y monto
      cy.get('@selectedMachineName').then((name) => {
        cy.get('#inv-item-name').should('contain', name.trim());
      });
      cy.get('@selectedMachinePrice').then((price) => {
        cy.get('#inv-grand-total').should('contain', price.trim());
      });

      // Cerrar modal de factura
      cy.get('#invoice-modal .modal-close-btn').click();
      cy.get('#invoice-modal').should('not.have.class', 'active');
    });
  });

  // ==========================================================================
  // 4. CASO DE USO CU-09: GESTIÓN DE INVENTARIO ADMINISTRADOR
  // ==========================================================================
  context('CU-09: Gestión de Inventario Administrador', () => {
    beforeEach(() => {
      cy.loginAs('admin@maqui.com', 'admin');
    });

    it('CU-09: Debe agregar una nueva maquinaria y actualizar la tabla y métricas automáticamente', () => {
      const newName = 'Pavimentadora Asfáltica Vögele Super 1800';
      const newPrice = '175000';
      const newStock = '3';

      // Abrir formulario desplegable/modal y llenar datos (CU-09)
      cy.get('#btn-open-add-machine').click();
      cy.get('#new-machine-name').type(newName);
      cy.get('#new-machine-price').type(newPrice);
      cy.get('#new-machine-stock').type(newStock);
      cy.get('#add-machine-form button[type="submit"]').click();

      // Toast de éxito
      cy.get('.toast.toast-success')
        .should('be.visible')
        .and('contain', 'Maquinaria Registrada');

      // Comprobar que la nueva maquinaria encabeza la tabla
      cy.get('#inventory-table tr').first().within(() => {
        cy.should('contain', newName);
        cy.should('contain', '$175,000');
        cy.should('contain', '3 unidades');
      });

      // Formulario debe haberse limpiado
      cy.get('#new-machine-name').should('have.value', '');
    });

    it('Debe eliminar maquinaria mediante el Modal de Confirmación personalizado (sin confirm nativo)', () => {
      // Capturar nombre del primer equipo
      cy.get('#inventory-table tr').first().find('.table-machinery-cell').invoke('text').as('itemToDelete');

      // Clic en botón Eliminar
      cy.get('#inventory-table tr').first().find('.btn-danger').click();

      // Debe abrir el Modal de Confirmación
      cy.get('#confirm-modal').should('have.class', 'active');
      cy.get('#confirm-modal-title').should('contain', '¿Eliminar del inventario?');

      // Confirmar eliminación
      cy.get('#confirm-modal-ok').click();
      cy.get('#confirm-modal').should('not.have.class', 'active');

      // Toast informativo de eliminación
      cy.get('.toast.toast-info').should('be.visible');
    });
  });

});
