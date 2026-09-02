(function () {
  "use strict";

  var data = window.ICEBBS_DATA || { boards: [], posts: [] };
  var storageKey = "icebbs-user-posts-v1";
  var userPosts = readUserPosts();

  function readUserPosts() {
    try {
      var stored = JSON.parse(window.localStorage.getItem(storageKey) || "[]");
      return Array.isArray(stored) ? stored.filter(isValidPost) : [];
    } catch (error) {
      return [];
    }
  }

  function isValidPost(post) {
    return post && typeof post.id === "string" && typeof post.board === "string" &&
      typeof post.title === "string" && typeof post.content === "string" &&
      typeof post.createdAt === "string";
  }

  function allPosts() {
    return data.posts.concat(userPosts).slice().sort(function (left, right) {
      return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime();
    });
  }

  function boardPosts(boardId) {
    return allPosts().filter(function (post) { return post.board === boardId; });
  }

  function pad(value) {
    return String(value).padStart(2, "0");
  }

  function formatDateTime(value) {
    var date = new Date(value);
    if (Number.isNaN(date.getTime())) return "日期未知";
    return date.getFullYear() + "-" + pad(date.getMonth() + 1) + "-" + pad(date.getDate()) +
      " " + pad(date.getHours()) + ":" + pad(date.getMinutes());
  }

  function renderHome() {
    document.querySelectorAll("[data-board-row]").forEach(function (row) {
      var boardId = row.getAttribute("data-board-id");
      var posts = boardPosts(boardId);
      var count = row.querySelector("[data-board-count]");
      var latest = row.querySelector("[data-board-latest]");
      count.textContent = String(posts.length);
      latest.replaceChildren();

      if (!posts.length) {
        var empty = document.createElement("span");
        empty.className = "empty";
        empty.textContent = "暂无文章";
        latest.appendChild(empty);
        return;
      }

      var post = posts[0];
      var link = document.createElement("a");
      link.href = "./" + boardId + "/#" + encodeURIComponent(post.id);
      link.textContent = post.title;
      var time = document.createElement("time");
      time.dateTime = post.createdAt;
      time.textContent = formatDateTime(post.createdAt);
      latest.append(link, time);
    });
  }

  function renderBoard() {
    var page = document.querySelector("[data-board-page]");
    if (!page) return;
    var boardId = page.getAttribute("data-board-id");
    var posts = boardPosts(boardId);
    var list = document.querySelector("[data-post-list]");
    var total = document.querySelector("[data-board-total]");
    total.textContent = String(posts.length);
    list.replaceChildren();

    if (!posts.length) {
      var empty = document.createElement("p");
      empty.className = "topic-empty";
      empty.textContent = "本版块尚无文章。";
      list.appendChild(empty);
      return;
    }

    posts.forEach(function (post) {
      var article = document.createElement("article");
      article.className = "topic-row";
      article.id = post.id;
      var heading = document.createElement("div");
      heading.className = "topic-heading";
      var title = document.createElement("h2");
      var link = document.createElement("a");
      link.href = "#" + encodeURIComponent(post.id);
      link.textContent = post.title;
      title.appendChild(link);
      var time = document.createElement("time");
      time.dateTime = post.createdAt;
      time.textContent = formatDateTime(post.createdAt);
      heading.append(title, time);
      var content = document.createElement("div");
      content.className = "topic-content";
      var paragraph = document.createElement("p");
      paragraph.textContent = post.content;
      content.appendChild(paragraph);
      article.append(heading, content);
      list.appendChild(article);
    });
  }

  function setupEditor() {
    var page = document.querySelector("[data-board-page]");
    if (!page) return;
    var boardId = page.getAttribute("data-board-id");
    var editor = document.querySelector("[data-post-editor]");
    var form = editor.querySelector("form");
    var openButton = document.querySelector("[data-new-post]");
    var cancelButton = document.querySelector("[data-cancel-post]");
    var titleInput = form.elements.title;
    var contentInput = form.elements.content;
    var status = editor.querySelector("[data-editor-status]");

    function showEditor() {
      editor.hidden = false;
      openButton.setAttribute("aria-expanded", "true");
      titleInput.focus();
    }

    function hideEditor() {
      editor.hidden = true;
      openButton.setAttribute("aria-expanded", "false");
      status.textContent = "";
    }

    openButton.addEventListener("click", showEditor);
    cancelButton.addEventListener("click", hideEditor);
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var title = titleInput.value.trim();
      var content = contentInput.value.trim();
      if (!title || !content) {
        status.textContent = "请填写标题和正文。";
        return;
      }

      var post = {
        id: "post-" + Date.now().toString(36),
        board: boardId,
        title: title,
        content: content,
        createdAt: new Date().toISOString()
      };
      userPosts.unshift(post);

      try {
        window.localStorage.setItem(storageKey, JSON.stringify(userPosts));
      } catch (error) {
        status.textContent = "浏览器无法保存文章，请检查隐私或存储设置。";
        return;
      }

      form.reset();
      hideEditor();
      renderBoard();
      window.location.hash = post.id;
    });
  }

  renderHome();
  renderBoard();
  setupEditor();

  window.addEventListener("storage", function (event) {
    if (event.key !== storageKey) return;
    userPosts = readUserPosts();
    renderHome();
    renderBoard();
  });
}());
