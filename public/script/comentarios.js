(async () => {
  const searchParams = new URLSearchParams(window.location.search);
  const postId = searchParams.get("id");

  const resposta = await fetch(`/posts/${postId}`);
  const postagem = await resposta.json();

  document.querySelectorAll(".publi")[0].innerHTML = `
    <div class="post">
      <div class="post-header">
        <img
          src="${postagem.imagem || "/images/transferir 2 (2).svg"}"
          alt="Perfil"
          class="post-perfil"
        />
        <div class="post-user">
          <strong>${postagem.autor}</strong>
          <span>há 1 min</span>
        </div>
        <div class="opciones_div">
          <img src="/images/lixeira.svg" alt="opções" class="opciones"/>
        </div>
      </div>
      <p>${postagem.conteudo}</p>
      <div class="post-actions">
        <img src="/images/Frame (2).svg" alt="like" />
        <img src="/images/Frame (1).svg" alt="comentario" />
      </div>
    </div>
  `;

  const comentariosDiv = document.querySelectorAll(".publi")[1];
  comentariosDiv.innerHTML = "";

  postagem.comentarios?.forEach((comentario) => {
    comentariosDiv.innerHTML += `
      <div class="post1">
        <div class="post-header">
          <img
            src="${comentario.imagem || "/images/transferir 2 (2).svg"}"
            alt="Perfil"
            class="post-perfil"
          />
          <div class="post-user">
            <strong>${comentario.usuario?.nome || "Anônimo"}</strong>
            <span>há 1 min</span>
          </div>
          <div class="opciones_div">
            <img
              src="/images/ellipsis-vertical-solid-full 1.svg"
              alt="opções"
              class="opciones"
            />
          </div>
        </div>
        <p>${comentario.conteudo}</p>
      </div>
    `;
  });

  comentariosDiv.innerHTML += `
    <div class="criar-comentario">
      <input type="text" id="novoComentario" placeholder="Escreva um comentário..." />
      <button id="btnComentar">Comentar</button>
    </div>
  `;

  document.querySelector("#btnComentar").addEventListener("click", async () => {
    const conteudo = document.querySelector("#novoComentario").value.trim();
    const usuarioId = localStorage.getItem("idUsuario");

    if (!conteudo) {
      alert("Digite algo antes de comentar!");
      return;
    }

    try {
      const resposta = await fetch("/comentario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conteudo,
          usuarioId,
          postId: postagem.id,
          curtidas: 0,
        }),
      });

      if (resposta.ok) {
        document.querySelector("#novoComentario").value = "";
        location.reload();
      } else {
        const erro = await resposta.json();
        alert(erro.erro || "Erro ao enviar comentário");
      }
    } catch (e) {
      console.error("Erro ao comentar:", e);
      alert("Erro ao conectar com o servidor.");
    }
  });
})();
