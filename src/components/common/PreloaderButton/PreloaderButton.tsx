import React from 'react';
import LoginIcon from "@mui/icons-material/Login";
import LoadingButton from "@mui/lab/LoadingButton";

type PreloaderButtonProps = {
    hasLoading: boolean,
    hasDisabled: boolean,
    clickHandler: () => void,
    label: string
}

const PreloaderButton: React.FC<PreloaderButtonProps> = (props) => {
    const {hasLoading, hasDisabled, clickHandler, label} = props;

    return (
        <LoadingButton
            variant="contained"
            loading={hasLoading}
            loadingPosition="center"
            startIcon={<LoginIcon/>}
            disabled={hasDisabled}
            onClick={clickHandler}
        >
            {label}
        </LoadingButton>
    );
};

export default PreloaderButton;
