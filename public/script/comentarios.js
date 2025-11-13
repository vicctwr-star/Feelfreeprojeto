(async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    alert("Nenhum post selecionado para comentar!");
    return;
  }

  const response = await fetch(`/comentarios/${postId}`);
  const comentarios = (await response.json()).map((comentario) => ({
    id: comentario.id,
    autor: comentario.usuario.nome,
    conteudo: comentario.conteudo,
    usuarioId: comentario.usuarioId,
  }));

  console.log(comentarios);

  document.querySelector(".comentarios").innerHTML = "";
  comentarios.forEach((comentario) => mostrarComentario(comentario));

  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const conteudo = document.querySelector("textarea").value.trim();

    if (!conteudo) {
      alert("O comentário não pode estar vazio!");
      return;
    }

    const comentarioNovo = {
      autor: localStorage.getItem("nome") || "guest",
      conteudo,
      usuarioId: localStorage.getItem("idUsuario"),
      postId,
    };

    enviarComentario(comentarioNovo);
  });
})();

async function enviarComentario(comentario) {
  try {
    const resposta = await fetch(`/comentarios`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        conteudo: comentario.conteudo,
        postId: comentario.postId,
      }),
    });

    if (!resposta.ok) {
      alert("Erro ao postar comentário.");
      return;
    }

    const novoComentario = await resposta.json();
    mostrarComentario({
      id: novoComentario.id,
      autor: localStorage.getItem("nome"),
      conteudo: novoComentario.conteudo,
      usuarioId: localStorage.getItem("idUsuario"),
    });

    document.querySelector("textarea").value = "";
  } catch (erro) {
    console.error("Erro ao enviar comentário:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}

function mostrarComentario(comentario) {
  const idUsuarioLogado = localStorage.getItem("idUsuario");

  document.querySelector(".comentarios").innerHTML += `
    <div class="comentario">
      <div class="comentario-header">
        <strong>${comentario.autor}</strong>
      </div>
      <p>${comentario.conteudo}</p>
      ${
        comentario.usuarioId == idUsuarioLogado
          ? `<img 
              src="/images/lixeira.svg.svg" 
              alt="excluir" 
              class="lixeira"
              onclick="excluirComentario(${comentario.id})"
            />`
          : ""
      }
    </div>
  `;
}

async function excluirComentario(id) {
  if (!confirm("Tem certeza que deseja excluir este comentário?")) return;

  try {
    const resposta = await fetch(`/comentarios/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      alert("Comentário excluído com sucesso!");
      const comentario = document
        .querySelector(`img[onclick="excluirComentario(${id})"]`)
        ?.closest(".comentario");
      if (comentario) comentario.remove();
    } else {
      alert(resultado.erro || "Erro ao excluir o comentário.");
    }
  } catch (erro) {
    console.error("Erro ao tentar excluir comentário:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}
