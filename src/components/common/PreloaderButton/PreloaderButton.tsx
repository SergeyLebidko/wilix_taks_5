import React from 'react';
import LoadingButton from "@mui/lab/LoadingButton";

type PreloaderButtonProps = {
    isLoading: boolean,
    isDisabled: boolean,
    clickHandler: () => void,
    label: string
}

const PreloaderButton: React.FC<PreloaderButtonProps> = (props) => {
    const {isLoading, isDisabled, clickHandler, label} = props;

    return (
        <LoadingButton
            variant="contained"
            loading={isLoading}
            loadingPosition="center"
            disabled={isDisabled}
            onClick={clickHandler}
        >
            {label}
        </LoadingButton>
    );
};

export default PreloaderButton;
