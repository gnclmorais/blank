<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="hero-title">
          About
        </h1>
      </div>
    </section>

    <section>
      <dl>
        <dt>What is this?</dt>
        <dd>
          <p>
            A few months ago, I realised that I had reached
            <a href="https://app.getpocket.com">Pocket</a> “bankruptcy”,
            where I found myself with almost 2000 articles to read.
            At this stage, looking at my list was more of a chore than a joy.
          </p>
          <p>
            The <span class="brand">Blank.</span> project came from an attempt
            to declutter my overflowing stack of articles.
            Creating a new account was not an option for me.
            I just wanted the white space back to start again,
            more mindful of what add and what I can actually read.
          </p>
        </dd>

        <dt>Will you support more services?</dt>
        <dd>
          <p>
            Maybe.
            I’m interested in helping people fight their digital clutter,
            so more integrations are definitely in the roadmap.
            Tell me which ones I should be focusing on
            <a href="https://airtable.com/shrKTzukHagJMNFmZ" target="_blank">here</a>.
          </p>
        </dd>

        <dt>Why delete and not archive?</dt>
        <dd>
          <p>
            That is cheating.
            You should only archive the articles you actually read.
          </p>
        </dd>

        <dt>Who made this?</dt>
        <dd>
          <p>
            Hi! 👋 My name is Gonçalo and you can find me on
            <a href="https://twitter.com/gnclmorais" target="_blank">Twitter</a>
            or
            <a href="https://github.com/gnclmorais" target="_blank">GitHub</a>.
          </p>
        </dd>
      </dl>
    </section>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
dt {
  font-weight: bolder;
  text-decoration: line-through;
}

dd {
  margin-bottom: 2rem;
  margin-left: 0;
}

p {
  margin: 0;
  text-align: justify;
  text-justify: inter-word;
}
p + p {
  text-indent: 2rem;
}

a {
  color: rgb(17, 106, 101);
}
</style>
