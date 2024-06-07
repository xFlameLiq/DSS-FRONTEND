import { SxProps, Theme } from "@mui/material";

export const navbar: SxProps<Theme> = {
    width: "100%",
};
export const appbar: SxProps<Theme> = {
    backgroundColor: "lightskyblue",

    alignItems: "center",
};

export const toolbar: SxProps<Theme> = {
    width: "100%",
    justifyContent: "space-between",
};


export const rol: SxProps<Theme> = {
    display: "inline",
    fontWeight: "700",
    fontSize: "1.2rem",
};


export const content_container: SxProps<Theme> = {
    maxWidth: "70%",
    //backgroundColor: "lightcoral",
    margin: "0 auto",
    marginTop: "5rem",
    padding: "2rem",
};

export const form_container: SxProps<Theme> = {
    width: "100%",
    padding: "1rem",
    backgroundColor: (theme) => theme.palette.backgroundForm.main,
    color: (theme) => theme.palette.mainText.main,
};

export const title_container: SxProps<Theme> = {
    width: "100%",
    minWidth: "20%",
    marginBottom: "2rem",
};

export const title: SxProps<Theme> = {
    fontWeight: "500",
    fontSize: "1.5rem",
    textAlign: "center",
};

export const form_fields: SxProps<Theme> = {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
};

export const field_container: SxProps<Theme> = {
    width: "60%",
    margin: "0 auto",

};

export const captions: SxProps<Theme> = {
   marginBottom: "0.3rem",
};


export const field: SxProps<Theme> = {
   
};


export const state_container: SxProps<Theme> = {
    marginTop: "2rem",
    textAlign: "center",
};

export const error: SxProps<Theme> = {
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "lightcoral",
};

export const success: SxProps<Theme> = {
    fontSize: "1.4rem",
    fontWeight: "400",
    color: "#00554E",
};





export const button_container: SxProps<Theme> = {
    display: "flex",
    justifyContent: "center",
   width: "70%",
   margin: "0 auto",
   marginTop: "2rem",
};



