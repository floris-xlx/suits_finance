import React, { useState, useEffect, Fragment } from 'react';
import { GetUserFeatureFlags } from '@/app/client/supabase/SupabaseUserData';
import { CodeBracketIcon } from '@heroicons/react/24/outline';
import { useUserStore } from '@/app/stores/stores';
import ButtonIcon from "@/app/components/ui/Buttons/ButtonIcon";
import { Modal, useModal } from '@/app/components/ui/Modals/ModalHelper';
import ToggleBlockUsers from '@/app/components/ui/Switches/ToggleBlockUsers';
import InputFieldDataWrapperUser from '@/app/components/dataWrappers/inputFieldWrapperUser';


const DeveloperViewLayout = () => {
    const { user } = useUserStore();
    const [isDeveloper, setIsDeveloper] = useState(false);
     const { modalRef: modalRef_developer, handleOpenModal: handleOpenModal_developer } = useModal();

    useEffect(() => {
        const checkDeveloper = async () => {
            const flags = await GetUserFeatureFlags(user.id);
            const isDeveloper = flags.developer_flag;
            setIsDeveloper(isDeveloper);
        }

        checkDeveloper();
    }, []);

    // if not developer, return null (no button)
    if (!isDeveloper) {
        return null;
    }

    const handleDeveloperView = () => {
        handleOpenModal_developer();
    }

    return (

        <Fragment>
            <Modal
                title={'Developer view'}
                buttonText={'Close'}
                ref={modalRef_developer}

            >
                <div className="flex flex-col w-full">
                    <ToggleBlockUsers
                        label={'Super admin'}
                        subText={'Toggle super admin status'}
                        supabaseKey={'super_admin'}
                        userId={user.id}

                    />
                    <ToggleBlockUsers
                        label={'Organization admin'}
                        subText={'Toggle organization admin status'}
                        supabaseKey={'org_admin'}
                        userId={user.id}
                    />

                    <ToggleBlockUsers
                        label={'Account frozen'}
                        subText={'Toggle account frozen status'}
                        supabaseKey={'is_frozen'}
                        userId={user.id}
                    />

                    <InputFieldDataWrapperUser
                        label={'Balance (DEMO)'}
                        supabaseKey={'balance'}
                        userId={user.id}
                        type={'number'}
                        show={true}
                        auditLog={false}
                    />
                </div>

            </Modal>

            <div className="bg-red-400/40 rounded-md">
                <ButtonIcon onPress={handleDeveloperView} border={true} transparent={true}>
                    < CodeBracketIcon className="h-6 w-6 icon" />
                </ButtonIcon>
            </div>

        </Fragment>
    )
}


export default DeveloperViewLayout;