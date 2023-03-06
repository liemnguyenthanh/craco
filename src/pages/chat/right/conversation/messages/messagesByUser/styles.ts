

export const styles = {
  main: (isMySelf: boolean) => (
    {
      display: "flex",
      gap: "10px",
      justifyContent: isMySelf ? "end" : "left",
    }
  ),
  listMessage: (isMySelf: boolean) => ({
    display: "flex",
    gap: "4px",
    flexDirection: "column",
    maxWidth: 'calc(100% - 100px)',
    alignItems: isMySelf ? "end" : "left",
  }),
  message: (isMySelf: boolean) => ({
    whiteSpace: 'pre-line',
    wordBreak: "break-all",
    p: 1,
    mb: 0.5,
    border: 1,
    borderColor: "border.primary",
    borderRadius: "8px",
    width: "fit-content",
    fontSize: "14px",
    backgroundColor: isMySelf ? "myBackground.main" : "active.main",
    "&:first-of-type": {
      [isMySelf ? "borderTopRightRadius" : "borderTopLeftRadius"]: "0",
    }
  }),
  time: {
    fontSize: "10px",
    mb: 0.5,
  }
}