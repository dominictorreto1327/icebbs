import Link from 'next/link';

const boards = [
  { mark: '公', name: '冰点公告', description: '关于本站、更新记录与长期计划', count: '03', latest: '冰点论坛，重新开张', date: '2026-09-01' },
  { mark: '造', name: '开发与构建', description: '软件、网站、硬件，以及把想法做出来的过程', count: '12', latest: '从零重建 icebbs', date: '2026-09-01' },
  { mark: '集', name: '个人项目', description: '正在进行、已经完成，以及暂时搁置的项目档案', count: '08', latest: '项目索引正在整理中', date: '2026-08-28' },
  { mark: '读', name: '阅读与写作', description: '书、文章、笔记和一些没有固定去处的文字', count: '17', latest: '近期阅读札记', date: '2026-08-22' },
  { mark: '游', name: '游戏与数码', description: '游戏记录、设备体验与互联网旧事', count: '09', latest: '那些消失的网站', date: '2026-08-16' },
  { mark: '常', name: '生活随笔', description: '日常、旅行、兴趣，以及值得记住的小事', count: '21', latest: '夏末近况', date: '2026-08-08' },
];

const updates = [
  ['从零重建 icebbs', '开发与构建', '09-01'],
  ['冰点论坛，重新开张', '冰点公告', '09-01'],
  ['项目索引正在整理中', '个人项目', '08-28'],
  ['近期阅读札记', '阅读与写作', '08-22'],
  ['那些消失的网站', '游戏与数码', '08-16'],
];

export default function Home() {
  return (
    <div className="site-shell">
      <header className="masthead">
        <div className="brand-row">
          <Link className="brand" href="/icebbs/" aria-label="冰点论坛首页">
            <span className="brand-seal" aria-hidden="true">冰</span>
            <span><strong>冰点论坛</strong><small>ICEBBS · SINCE 2026</small></span>
          </Link>
          <p className="masthead-note">一个人的论坛，一些长期存在的东西。</p>
        </div>
        <nav className="main-nav" aria-label="主导航">
          <Link className="active" href="/icebbs/">论坛首页</Link>
          <span className="nav-placeholder" aria-hidden="true" />
          <span className="nav-placeholder" aria-hidden="true" />
          <span className="nav-placeholder" aria-hidden="true" />
        </nav>
      </header>

      <main>
        <div className="crumbs" aria-label="当前位置"><span>当前位置</span><span aria-hidden="true">›</span><strong>冰点论坛</strong></div>

        <section className="notice" aria-labelledby="notice-title">
          <div className="notice-label">站务公告</div>
          <div className="notice-body">
            <h1 id="notice-title">冰点论坛，重新开张。</h1>
            <p>这里是我的个人网站，也是所有个人项目、开发记录与兴趣内容的集散地。它借用了早期 BBS 的外观，但没有注册、回帖与积分；内容只由我持续添加。</p>
          </div>
          <time dateTime="2026-09-01">2026-09-01</time>
        </section>

        <div className="content-grid">
          <section id="boards" className="panel board-panel" aria-labelledby="boards-title">
            <div className="panel-title"><h2 id="boards-title">论坛版面</h2><span>共 6 个版面</span></div>
            <div className="board-head" aria-hidden="true"><span>版面</span><span>文章</span><span>最后更新</span></div>
            <div className="board-list">
              {boards.map((board) => (
                <article className="board-row" id={board.name} key={board.name}>
                  <span className="board-mark" aria-hidden="true">{board.mark}</span>
                  <div className="board-copy"><h3><a href={`#${board.name}`}>{board.name}</a></h3><p>{board.description}</p></div>
                  <span className="board-count" aria-label={`${board.count} 篇文章`}>{board.count}</span>
                  <div className="board-latest"><a href={`#${board.name}`}>{board.latest}</a><time dateTime={board.date}>{board.date}</time></div>
                </article>
              ))}
            </div>
          </section>

          <aside className="sidebar">
            <section id="about" className="panel about-panel" aria-labelledby="about-title">
              <div className="panel-title"><h2 id="about-title">关于 icebbs</h2></div>
              <div className="panel-body">
                <p>“冰点论坛”这个名字，是向青岛二中曾经由学生自建的同名论坛致敬。原站如今已无法登录，但那种自由、朴素的互联网气质值得被记住。</p>
                <dl className="stats">
                  <div><dt>主题</dt><dd>个人创造与兴趣</dd></div>
                  <div><dt>形式</dt><dd>静态内容网站</dd></div>
                  <div><dt>更新</dt><dd>不定期，长期维护</dd></div>
                </dl>
              </div>
            </section>

            <section id="updates" className="panel updates-panel" aria-labelledby="updates-title">
              <div className="panel-title"><h2 id="updates-title">最近更新</h2></div>
              <ol className="update-list">
                {updates.map(([title, board, date], index) => (
                  <li key={title}>
                    <span className="update-index">{String(index + 1).padStart(2, '0')}</span>
                    <div><a href={`#${board}`}>{title}</a><small>{board}</small></div>
                    <time>{date}</time>
                  </li>
                ))}
              </ol>
            </section>
          </aside>
        </div>
      </main>

      <footer>
        <p>ICEBBS · 冰点论坛</p>
        <p>此处没有新帖提醒，只有慢慢增加的内容。</p>
        <a href="#top">返回顶部 ↑</a>
      </footer>
    </div>
  );
}
