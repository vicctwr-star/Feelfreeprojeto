const token = sessionStorage.getItem("token");
if (!token) {
  window.location.href = "/login.html";
}

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get("id");
const nomeUsuario = localStorage.getItem("nome");
const formulario = document.querySelector("form");
const elementoPostagem = document.querySelector(".post");
const elementoComentarios = document.querySelector(".post1");
const idUsuario = localStorage.getItem("idUsuario");
const inputComentario = document.querySelector("textarea");

let listaDeComentarios = [];

formulario.addEventListener("submit", async (event) => {
  event.preventDefault();
  const conteudo = inputComentario.value.trim();

  if (!conteudo) {
    alert("O comentário não pode estar vazio!");
    return;
  }

  const comentarioNovo = {
    autor: nomeUsuario || "guest",
    conteudo,
    usuarioId: idUsuario,
    ehMeuComentario: true,
    postId,
  };

  try {
    console.log(comentarioNovo);

    const resposta = await fetch(`/comentario`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },

      body: JSON.stringify({
        usuarioId: comentarioNovo.usuarioId,
        postId: comentarioNovo.postId,
        conteudo: comentarioNovo.conteudo,
        curtidas: 0,
      }),
    });

    if (!resposta.ok) {
      alert("Erro ao postar comentário.");
      return;
    }

    carregarComentarios();
    document.querySelector("textarea").value = "";
  } catch (erro) {
    console.error("Erro ao enviar comentário:", erro);
    alert("Erro ao conectar com o servidor.");
  }
});

(async () => {
  elementoPostagem.innerHTML = "";

  try {
    const response = await fetch(`/posts/${postId}`);
    const postagem = await response.json();
    listaDeComentarios = postagem.comentarios.map((comentario) => ({
      id: comentario.id,
      autor: comentario.autor,
      conteudo: comentario.conteudo,
      usuarioId: comentario.usuarioId,
      ehMeuComentario: comentario.usuarioId == idUsuario,
    }));

    console.log("Postagem e comentários carregados com sucesso.");
    elementoPostagem.innerHTML = `
      <div class="post-header">
      <img
        src="/images/fotosemperfil.svg"
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

    carregarComentarios();
  } catch (error) {
    console.error("Erro ao buscar postagem:", error);
  }
})();

async function carregarComentarios() {
  elementoComentarios.innerHTML = "";

  try {
    const resposta = await fetch(`/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (!resposta.ok) {
      alert("Erro ao carregar comentários.");
      return;
    }

    listaDeComentarios = (await resposta.json()).comentarios.map(
      (comentario) => ({
        id: comentario.id,
        autor: comentario.autor,
        conteudo: comentario.conteudo,
        usuarioId: comentario.usuarioId,
        ehMeuComentario: comentario.usuarioId == idUsuario,
      })
    );

    listaDeComentarios.forEach((comentario) => {
      elementoComentarios.innerHTML += `
        <div class="post-header">
            <img
              src="/images/fotosemperfil.svg"
              alt="Perfil"j
              class="post-perfil"
            />
            <div class="post-user">
              <strong>${comentario.autor}</strong>
              <span>há 1 min</span>
            </div>
            <div class="opciones_div">
            ${
              comentario.ehMeuComentario
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
    });
  } catch (erro) {
    console.error("Erro ao carregar comentários:", erro);
    alert("Erro ao conectar com o servidor.");
  }
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

      carregarComentarios();
    } else {
      alert(resultado.erro || "Erro ao excluir o comentário.");
    }
  } catch (erro) {
    console.error("Erro ao tentar excluir comentário:", erro);
    alert("Erro ao conectar com o servidor.");
  }
}
