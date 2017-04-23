//---translation---

function dictionary() {
    var dict = {
/*        langTemplate: {
            // translatable elements for admin_addusers.html
            
            // translatable elements for adminallbeverages.html
            
            // translatable elements for adminbeverages.html
            
            // translatable elements for adminhistory.html
            
            // translatable elements for adminusers.html
            
            // translatable elements for allbeverages.html
            
            // translatable elements for history.html
            
            // translatable elements for index.html
            loginHead: '',
            userLabel: '',
            uname: '',
            pswLabel: '',
            psw: '',
            personalButton: '',
            staffButton: ''
        },
*/
        sv: {
            /* Index page */
            username_label_index: ' Användarnamn',
            username_placeholder_index: 'Användarnamn',
            password_label_index: ' Lösenord',
            password_placeholder_index: 'Lösenord',
            login_button: 'Logga in',
            
            /* ---- Header for all pages ----*/
            /* nav links */
            all_beverages: 'Alla drycker',
            previously_bought: 'Tidigare köp',
            manage_users: 'Hantera användare',
            manage_beverages: 'Hantera drycker',
            edit_users: 'Redigera användare',
            edit_balance: 'Redigera användarsaldo',
            edit_slots: 'Redigera tillgängliga drycker',
            edit_stock_price: 'Redigera lager/pris',
            /* User info in header */
            log_out: 'Logga ut',
            welcome_p: 'Välkommen  ',
            user_balance_p: 'Saldo:  ',
            
            /* All beverages page */
            purchase_p: 'För att köpa en dryck, klicka på Buy-knappen eller dra och släpp en dryck i kundvagnen',
            beer_cat: 'Öl',
            cider_cat: 'Cider',
            wine_cat: 'Vin',
            non_cat: 'Alkoholfritt',
            heading_cart: 'Kundvagn',
            totalamount: 'Totalt:',
            purchase_button: 'Köp',
            clear_button: 'Töm kundvagn',
            
            /* Previously bought/history page */
            prev_bought_drinks: 'Tidigare köpta drycker',
            drink_th: 'Dryck',
            timestamp_th: 'Tidsstämpel',
            price_th: 'Pris',
            
            /* Manage user - 'Add user' & 'Edit user' tableheaders */
            username_th: 'Användarnamn',
            first_name_th: 'Förnamn',
            last_name_th: 'Efternamn',
            email_th: 'Email',
            phone_th: 'Telefonnr',
			add_user_instruction: 'Fyll i följande fält för att lägga till en ny användare. Alla fält måste fyllas i.',
			edit_user_instruction: 'Klicka på edit-knappen bredvid din utvalda användare och ändra fälten som du vill uppdatera för att redigera en användare. Alla fält måste fyllas i och användarnamnet går inte att ändra.',
			edit_balance_instruction: 'Klicka på edit-knappen bredvid din utvalda användare och ange ett nytt saldo för att redigera användarsaldot. Båda fälten måste fyllas i.',
			edit_stock_instruction: 'Klicka på edit-knappen bredvid din utvalda dryck och ändra fälten som du vill uppdatera för att redigera en dryck. Alla fält måste fyllas i.',
            /* 'Edit balance' page tablehead */
            quantity_th: 'Antal i lager',
            /* 'Edit user and balance' page tablehead */
            balance_th: 'Saldo',
            user_added_msg: 'Användare tillagd!',

            all_users_and_balance: 'Alla användare och deras saldo',
            all_users: 'Alla användare',
            edit_user_balance: 'Redigera användarsaldo',
            edit_user: 'Redigera användare',
            add_user: 'Lägg till användare',
            username_p: 'Användarnamn',
            usernameBalance: 'Användarnamn',
            usernameBalance_p: 'Saldo',
            /*  */
            admin_history: 'Tidigare köp',
            add_users: 'Lägg till användare',
            user_edited_msg: 'Användare uppdaterad!',
            balance_edited_msg: 'Saldo uppdaterat!',
            bev_updated_msg: 'Dryck uppdaterad!',

            //Balance: 'Saldo:  ',
            beverage_choose: 'Välj vilka drycker som finns i automaten',
            save_button: 'Spara ändringar',
            to_purchase: 'För att välja en dryck att köpa: dra och släpp en dryck i kundvagnen',
            users_category: 'Användarnamn Förnamn Efternamn Email Telefon',
            first_name: 'Förnamn',
            fname: 'Förnamn', //placeholder
            last_name: 'Efternamn',
            lname: 'Efternamn', //placeholder
            username: 'Användarnamn',
            password: 'Lösenord',
            email: 'Email',
            emailplaceholder:'Email',
            phone: 'Telefonnr',
            phoneplaceholder:'Telefonnr',
            saveuser_button: 'Spara användare',
            beverageh3: 'Drycker',
            bev_category: 'Dryck Pris Antal',
            edit_beverage: 'Redigera dryck',
            beveragetxt: 'Dryck',
            beveragePlaceholder: 'Välj ny dryck',
            quantitytxt: 'Antal',
            quantityPlaceholder: 'Välj nytt antal',
            pricetxt: 'Pris',
            pricePlaceholder: 'Välj nytt pris',
            savebeverage_button: 'Spara dryck',
            savebalance_button: 'Spara nytt saldo',
			
            
            // translatable elements for allbeverages.html
        },
        en: {
            /* Index page */
            username_label_index: ' Username',
            username_placeholder_index: 'Username',
            password_label_index: ' Password',
            password_placeholder_index: 'Password',
            login_button: 'Log in',
            
            /* ---- Header for all pages ----*/
            /* nav links */
            all_beverages: 'All Beverages',
            previously_bought: 'Previously Bought',
            manage_users: 'Manage Users',
            manage_beverages: 'Manage Beverages',
            add_users: 'Add User',
            edit_users: 'Edit User',
            edit_balance: 'Edit Balance',
            edit_slots: 'Edit Slots',
            edit_stock_price: 'Edit Stock/Price',
            /* User info in header */
            log_out: 'Log out',
            welcome_p: 'Welcome  ',
            user_balance_p: 'Balance:  ',
            
            /* All beverages page */
            purchase_p: 'To choose beverages to purchase: click the Buy-button or drag and drop a drink into the shopping cart',
            beer_cat: 'Beer',
            cider_cat: 'Cider',
            wine_cat: 'Wine',
            non_cat: 'Non-Alcoholic',
            heading_cart: 'Shopping cart',
            totalamount: 'Total:',
            purchase_button: 'Purchase',
            clear_button: 'Clear',
            
            /* Previously bought/history page */
            prev_bought_drinks: 'Previosly bought drinks',
            drink_th: 'Drink',
            timestamp_th: 'Time bought',
            price_th: 'Price',
            
            /* Manage user - 'Add user' & 'Edit user' tableheaders */
            username_th: 'Username',
            first_name_th: 'First Name',
            last_name_th: 'Last Name',
            email_th: 'Email',
            phone_th: 'Phone number',
			add_user_instruction: 'To add a new user, enter the following details. All fields must be filled out.',
			edit_user_instruction: 'To edit a user, click the edit button next to your desired user and change the fields that you want to update. All fields must be filled out and username can not be changed.',
			edit_balance_instruction: 'To edit the balance of a user, click the edit button next to your desired user and enter a new balance.<br /> Both fields must be filled out.',
			edit_stock_instruction: 'To edit a beverage, click the edit button next to your desired beverage and enter your new information. All fields must be filled out.',
            /* 'Edit balance' page tablehead */
            quantity_th: 'Quantity in stock',
            /* 'Edit user and balance' page tablehead */
            balance_th: 'Balance',
            user_added_msg: 'User added!',
            user_edited_msg: 'User updated!',
            balance_edited_msg: 'Balance updated!',
            bev_updated_msg: 'Beverage updated!',
            
            /*  */
            all_users_and_balance: 'All users and their balance',
            all_users: 'All users',
            edit_user_balance: ' Edit user balance',
            edit_user: ' Edit user',
            add_user: 'Add user',
            username_p: 'Username',
            usernameBalance: 'Username',
            usernameBalance_p: 'Balance',
            admin_history: 'Previously Bought',
            
            //Balance: 'Balance:  ',
            beverage_choose: 'Choose which beverages you want in the vending machine',
            save_button: ' Save changes ',
            //welcome: '<p id="welcome" class="transl">Welcome <span id="headerName"></span></p>',
            to_purchase: 'To purchase a beverage, drag and drop a drink into the shopping cart',
            users_category: 'Username Firstname Lastname Email Phone',
            first_name: 'First name',
            fname: 'First name', //placeholder
            last_name: 'Last name',
            lname: 'Last name', //placeholder
            username: 'Username',
            password: 'Password',
            email: 'Email',
            emailplaceholder:'Email',
            phone: 'Phone number',
            phoneplaceholder:'Phone number',
            saveuser_button: 'Save user',
            beverageh3: ' Beverages',
            bev_category: 'Beverage Price Quantity',
            edit_beverage: ' Edit Beverage',
            beveragetxt: ' Beverage ',
            beveragePlaceholder: 'Enter the beverage',
            quantitytxt: ' Quantity ',
            quantityPlaceholder: 'Enter a new quantity',
            pricetxt: 'Price',
            pricePlaceholder: 'Enter a new price',
            savebeverage_button: 'Save beverage',
            savebalance_button: 'Update user balance',
            
            // translatable elements for allbeverages.html
        }    
    }
    return dict[sessionStorage.getItem('sprak')];
}


function translate() {
    var textElem = document.getElementsByClassName('transl');
    var dict = dictionary();
    
    for(var j=0; j<textElem.length; j++) {
        var x = dict[textElem[j].id];
        if(x === undefined) {
            if(textElem[j].nodeName === 'INPUT') {
                if(textElem[j].getAttribute('placeholder')) {
                    x = textElem[j].getAttribute('placeholder');
                }
                else if(textElem[j].getAttribute('value')) {
                    x = textElem[j].getAttribute('value');
                }
            }
            else {
                x = document.getElementById(textElem[j].id).innerHTML;
            }
            //console.log(textElem[j].id + ": '" + x + "'" + ","); //if find translations id:s uncomment this
        }
        else {
            if(textElem[j].nodeName === 'INPUT') {
                if(textElem[j].getAttribute('placeholder')) {
                    textElem[j].setAttribute('placeholder', x);
                }
                else if(textElem[j].getAttribute('value')) {
                    textElem[j].setAttribute('value', x);
                }
            }
            else {
                document.getElementById(textElem[j].id).innerHTML = x;
            }
        }
    }
}


function langSelect() {
    var y = document.getElementById("language_choice");
    if (y == null) {
        y = document.getElementById("language_choice_index");
    }
    var x = y.value;
    sessionStorage.setItem('sprak', x);
    translate();
}


function checkLang() {
    if (!sessionStorage.getItem('sprak')) {
        sessionStorage.setItem('sprak', 'en') // Default language
    }
    var x = document.getElementById("language_choice");
    x.addEventListener("change", langSelect);
    document.getElementById(sessionStorage.getItem('sprak')).selected = 'true';
    translate();     
}

//-----------------
