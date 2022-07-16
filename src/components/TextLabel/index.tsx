import { Box } from "@mui/system";

interface ITextLabelProps {
  label: string;
  text: string | number | undefined;
}

function TextLabel(props: ITextLabelProps) {
  return (
    <Box component="p">
      <Box component="span" fontWeight={600}>
        {props.label}:{" "}
      </Box>
      <Box component="span" fontWeight={300}>
        {props.text}
      </Box>
    </Box>
  );
}

export default TextLabel;
