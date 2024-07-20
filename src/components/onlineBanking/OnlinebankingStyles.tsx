export const styles = {
    home_bg_container: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '50px', minHeight: '100vh'
    },

    home_page: {
        display: 'flex', flexDirection: 'column', padding: '50px', width: '90%', backgroundColor: '#f0f5f5'
    },

    welcome_container: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    },

    input_fields_container: {
        display: 'flex', alignItems: 'center', gap: '4px', marginTop: '20px'
    },

    input_fields: {
        outline: 'none', border: 'none', width: '120px', borderRadius: '20px', padding: '12px', backgroundColor: '#fff', textAlign: 'center', fontWeight: 400
    },

    login_icon: {
        fontSize: '35px', cursor: 'pointer',
    },

    result_content_container: {
        padding: '70px'
    },

    current_balance_container: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '30px', marginBottom: '10px'
    },

    main_content_container: {
        display: 'flex', gap: '20px'
    },

    table_box: {
        height: '400px', width: '100%'
    },

    table_container: {
        height: '530px', scrollY: 'scroll', visible: 'scroll',
    },

    deposit_cell: {
        backgroundImage: 'linear-gradient(#80ffaa, #00ff55)', borderRadius: '40px', color: '#fff', padding: '8px', fontWeight: '600',
    },

    withdrawal_cell: {
        backgroundImage: 'linear-gradient(#ff3333, #b30000)', borderRadius: '40px', color: '#fff', padding: '8px', fontWeight: '600',
    },

    balance_in_table: {
        fontWeight: '400', fontSize: '18px',
    },

    services_container: {
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px',
    },

    transfer_container: {
        backgroundImage: 'linear-gradient(#ffcc80, #ff9900)', padding: '30px', display: 'flex', flexDirection: 'column', minWidth: '250px', width: '300px', borderRadius: '15px'
    },

    send_button: {
        backgroundColor: '#fff', outline: 'none', color: '#000', alignSelf: 'flex-start'
    },

    loan_container: {
        backgroundImage: 'linear-gradient(#80ffaa, #00ff55)', padding: '30px', display: 'flex', flexDirection: 'column', minWidth: '250px', width: '300px', borderRadius: '15px'
    },

    delete_container: {
        backgroundImage: 'linear-gradient( #ff8080,  #ff3333)', padding: '30px', display: 'flex', flexDirection: 'column', minWidth: '250px', width: '300px', borderRadius: '15px'
    },

    info_container: {
        display: 'flex', justifyContent: 'space-between', marginTop: '10px'
    },

    in_out_content: {
        display: 'flex', width: '45%',
    },
}

