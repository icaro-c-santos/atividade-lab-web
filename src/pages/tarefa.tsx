
import { TarefasState } from "../domain/reducers";
import { IconButton, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { MyAppBar } from "../components/appBar";
import { useNavigate, useParams } from "react-router-dom";
import { TarefaNotFound } from "../components/tarefaNotFound";

interface Props {
  appState: TarefasState;
}

const formatarDataToBr = (date:Date) =>{
  const data = new Date(date);

  const dia = data.getDate();
  const mes = data.getMonth() + 1;
  const ano = data.getFullYear();

  return `${dia}/${mes}/${ano}`;
}

export const TarefaPage = ({ appState }: Props) => {
  const params = useParams();
  const { id: taskId } = params;

  const tarefa = appState.tarefas.find((tarefa) => tarefa.id === taskId);
   
  const navigate = useNavigate();

  if (!tarefa) {
    return <TarefaNotFound navigate={navigate} />;
  }
  return (
    <>
      <MyAppBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={() => {
            navigate("/");
          }}
        >
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {`Tarefa ${tarefa.name}`}
        </Typography>
      </MyAppBar>
      <main
        style={{
          padding: "2%",
          justifyContent: "space-around",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          flex: 1,
        }}
      >
        <Typography variant="h1">{tarefa.name}</Typography>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
            width: "80vw",
            marginTop: "2%",
          }}
        >
          <img
            src="https://picsum.photos/id/13/2500/1667?blur=2"
            height={300}
            width={300}
            style={{
              borderRadius: 10,
            }}
          />

          <section>
            <Typography variant="body1">
              Feita? {tarefa.done ? "👍" : "Nop 👎"}
            </Typography>
            <Typography variant="body1">
              Data de Criação:
              { formatarDataToBr(tarefa.createdAt)}
            </Typography>
            <Typography variant="body1">
              Data limite:
            { tarefa.limiteDate && formatarDataToBr(tarefa.limiteDate)}
            </Typography>
          </section>
        </div>
      </main>
    </>
  );
};
