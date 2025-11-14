async function inicio() {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get("id");

  if (!postId) {
    alert("Nenhum post selecionado para comentar!");
    return;
  }

  const response = await fetch(`/posts/${postId}`);
  const postagem = await response.json();
  const comentarios = postagem.comentarios.map((comentario) => ({
    id: comentario.id,
    autor: comentario.autor,
    conteudo: comentario.conteudo,
    usuarioId: comentario.usuarioId,
  }));

  document.querySelector(".post").innerHTML = `
  <div class="post-header">
    <img
      src="images/transferir 2 (2).svg"
      alt="Perfil"
      class="post-perfil"
    />
    <div class="post-user">
      <strong>${postagem.autor}</strong>
      <span>há 1 min</span>
    </div>
    <div class="opciones_div">
      <img
        src="/images/lixeira.svg.svg"
        alt="excluir"
        class="opciones"
      />
    </div>
  </div>
  <p>${postagem.conteudo}</p>
  <div class="post-actions">
    <img src="images/Frame (2).svg" alt="like" />
  </div>
  `;

  console.log(comentarios);

  document.querySelector(".post1").innerHTML = "";
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
}
inicio();

async function enviarComentario(comentario) {
  try {
    console.log({
      autor: localStorage.getItem("nome"),
      conteudo: comentario.conteudo,
      usuarioId: localStorage.getItem("idUsuario"),
      postId: comentario.postId,
    });
    const resposta = await fetch(`/comentario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
      body: JSON.stringify({
        autor: localStorage.getItem("nome"),
        conteudo: comentario.conteudo,
        usuarioId: localStorage.getItem("idUsuario"),
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
      conteudo: comentario.conteudo,
      usuarioId: localStorage.getItem("idUsuario"),
    });

    document.querySelector("textarea").value = "";
    inicio();
  } catch (erro) {
    console.error("Erro ao enviar comentário:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}

function mostrarComentario(comentario) {
  const idUsuarioLogado = localStorage.getItem("idUsuario");

  document.querySelector(".post1").innerHTML += `
  <div class="post-header">
            <img
              src="images/transferir 2 (2).svg"
              alt="Perfil"
              class="post-perfil"
            />
            <div class="post-user">
              <strong>${comentario.autor}</strong>
              <span>há 1 min</span>
            </div>
            <div class="opciones_div">
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
          </div>
          <p>${comentario.conteudo}</p>
          <div class="post-actions">
            <img src="images/Frame (2).svg" alt="like" />
          </div>  
        
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
