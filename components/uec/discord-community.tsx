import { ArrowRightIcon, CalendarIcon, ExternalLinkIcon, FilmIcon, GiftIcon, HistoryIcon, SparkIcon, TrophyIcon } from "./icons"
import { Reveal } from "./reveal"

const discordUrl = "https://discord.gg/UHhrNckudE"

const channels = [
  { group: "Information", items: ["news", "sub-news", "giveaways", "change-logs", "recommended"] },
  { group: "General", items: ["general", "media", "commands", "self-promotion", "suggestions"] },
  { group: "Editing Hub", items: ["scene-pack-search", "scene-packs", "collaboration", "resources", "edit-submissions"] },
]

const features = [
  { icon: FilmIcon, title: "Scene packs, ready to cut", text: "Find creator footage, scene packs and edit-ready resources without hunting through dead links." },
  { icon: SparkIcon, title: "Learn with other editors", text: "Share works in progress, get feedback, trade workflows and level up your editing together." },
  { icon: GiftIcon, title: "Giveaways and creator drops", text: "Get notified when creators post, host giveaways, launch events or open a new competition." },
  { icon: TrophyIcon, title: "Every result, in one place", text: "Follow tournament results, UEC announcements, uploads and the editors shaping the bracket." },
]

export function DiscordCommunity() {
  return (
    <section className="community-section section-pad section-line" id="community">
      <div className="wrap">
        <Reveal className="community-hero">
          <div className="community-copy">
            <span className="eyebrow">The UEC Community Server</span>
            <h2 className="section-heading">The bracket lives here.</h2>
            <p className="section-sub">Meet people who are into Unstable SMP, learn how to edit, find the next scene pack and stay close to every creator moment between rounds.</p>
            <div className="community-actions">
              <a className="btn btn-primary community-join" href={discordUrl} target="_blank" rel="noreferrer" aria-label="Join the UEC Discord server in a new tab">
                Join the UEC Discord <ExternalLinkIcon size={17} />
              </a>
              <span className="community-url">discord.gg/UHhrNckudE</span>
            </div>
          </div>
          <div className="community-signal" aria-hidden="true"><span className="community-signal-orbit" /><span className="community-signal-core">UEC</span></div>
        </Reveal>

        <div className="community-grid">
          <Reveal className="community-features" delay={70}>
            {features.map(({ icon: Icon, title, text }) => <article className="community-feature" key={title}><span className="community-feature-icon"><Icon size={19} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}
          </Reveal>

          <Reveal className="discord-preview" delay={140}>
            <div className="discord-preview-bar"><span className="discord-status-dot" /><div><strong>UEC Community</strong><span>active editing hub</span></div><span className="discord-online">online</span></div>
            <div className="discord-channel-list">
              {channels.map((channelGroup, groupIndex) => <div className="discord-channel-group" key={channelGroup.group}><span className="discord-channel-group-title">{channelGroup.group}</span>{channelGroup.items.map((channel, itemIndex) => <div className={`discord-channel-row${groupIndex === 2 && itemIndex === 1 ? " is-active" : ""}`} key={channel}><span className="discord-hash">#</span><span>{channel}</span>{channel === "giveaways" && <GiftIcon size={14} />}{channel === "scene-packs" && <FilmIcon size={14} />}{channel === "news" && <span className="discord-unread" />}</div>)}</div>)}
            </div>
            <div className="discord-preview-footer"><HistoryIcon size={15} /> <span>Announcements, uploads and recommendations land here first.</span></div>
          </Reveal>
        </div>

        <Reveal className="community-bottom" delay={200}>
          <div><CalendarIcon size={19} /><span><strong>Never miss the next event.</strong> Competitions, creator uploads and tournament updates, all in one feed.</span></div>
          <a href={discordUrl} target="_blank" rel="noreferrer" aria-label="Open UEC Discord invite"><span>Open invite</span><ArrowRightIcon size={17} /></a>
        </Reveal>
      </div>
    </section>
  )
}
