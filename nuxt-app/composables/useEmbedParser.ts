export function useEmbedParser(html: string | undefined): string {
    if (!html) return "";

    return html.replace(/<oembed url="(.*?)"><\/oembed>/g, (match, url) => {
        const youtubeMatch = url.match(
            /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/
        );
        if (youtubeMatch) {
            const videoId = youtubeMatch[1];
            return `
          <div class="embed">
            <iframe width="560" height="315"
              src="https://www.youtube.com/embed/${videoId}"
              frameborder="0"
              allowfullscreen>
            </iframe>
          </div>`;
        }
        return match;
    });
}
