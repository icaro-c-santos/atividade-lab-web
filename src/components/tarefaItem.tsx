import { Checkbox, Paper, IconButton, Typography } from "@mui/material";
import { Tarefa } from "../domain/model/tarefa";

interface Props {
  tarefa: Tarefa;
  onDelete: (id: string) => void;
  toggleDone: (id: string) => void;
  goToTarefa: (id: string) => void;
}




export const TarefaItem = ({
  tarefa,
  onDelete,
  toggleDone,
  goToTarefa,
}: Props) => {
  const opacity = tarefa.done ? 0.5 : 1;
  const taskIsLate = (new Date() > new Date(tarefa.limiteDate) && !tarefa.done);
  return (
    <Paper
      style={{
        padding: "1%",
        display: "flex",
        marginTop: "4%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        opacity,
        border: taskIsLate ? "1px solid red" : "1px solid transparent",
      }}
      elevation={1}
    >
      <Checkbox checked={tarefa.done} onClick={() => toggleDone(tarefa.id)} />

      <Typography
        variant="h4"
        style={{ textAlign: 'left', cursor: 'pointer', width: '100%' }}
        onClick={() => goToTarefa(tarefa.id)}
      >
        {tarefa.name}
      </Typography>

      <IconButton onClick={() => onDelete(tarefa.id)} />
    </Paper>
  );
};
