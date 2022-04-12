import React from 'react';
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
            disabled={hasDisabled}
            onClick={clickHandler}
        >
            {label}
        </LoadingButton>
    );
};

export default PreloaderButton;
