

export const styles = {
  main: (isMySelf: boolean) => ({
    display: "flex",
    gap: "10px",
    justifyContent: isMySelf ? "end" : "left",
  }),
  listMessage: (isMySelf: boolean) => ({
    ">div": {
      display: "flex",
      gap: "4px",
      flexDirection: "column",
      maxWidth: 'calc(100% - 100px)',
      alignItems: isMySelf ? "end" : "left",
    }
  }),
  message: (isMySelf: boolean) => ({
    whiteSpace: 'pre-line',
    wordBreak: "break-all",
    p: "8px 12px",
    border: 0.5,
    borderColor: "border.main",
    borderRadius: isMySelf ? "15px 5px 5px 15px" : "5px 15px 15px 5px",
    width: "fit-content",
    fontSize: "14px",
    backgroundColor: isMySelf ? "background.active" : "background.secondary",
    "&:first-of-type": {
      [isMySelf ? "borderTopRightRadius" : "borderTopLeftRadius"]: "0",
    }
  }),
  time: {
    fontSize: "10px",
    mb: 0.5,
  }
}