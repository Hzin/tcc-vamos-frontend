import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';

import { logInOutline, logInSharp, personOutline, personSharp } from 'ionicons/icons';

interface AppTab {
    label: string;
    iosIcon: string;
    mdIcon: string;
    // badge: string;
}

const appPages: AppTab[] = [
    {
        label: 'Login',
        iosIcon: logInOutline,
        mdIcon: logInSharp,
        // badge: '',
    },
    {
        label: 'Cadastro',
        iosIcon: personOutline,
        mdIcon: personSharp,
        // badge: '',
    }
]

const Tabs: React.FC = () => {
    return (
        
            <IonTabs>
                {appPages.map((appPage, index) => {
                    <IonTabBar key={index} slot="bottom">
                        <IonTabButton tab="speakers">
                            <IonIcon ios={appPage.iosIcon} md={appPage.mdIcon} />
                            <IonLabel>{appPage.label}</IonLabel>
                        </IonTabButton>
                    </IonTabBar>

                })}
            </IonTabs>
    );
}

export default Tabs