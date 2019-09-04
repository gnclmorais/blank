<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          About
        </h1>
      </div>
    </section>

    <section>
      <dl>
        <dt>What is this?</dt>
        <dd>
          <p>
            <strong>Blank.</strong> came from an honest
            <a href="https://app.getpocket.com">Pocket</a> “bankruptcy”,
            where I found myself with almost 2000 articles to read.
            At this stage, looking at my list was more of a chore than a joy.
          </p>
        </dd>

        <dt>Why delete and not archive?</dt>
        <dd>
          <p>
            That is cheating.
            You should only archive the articles you actually read.
          </p>
        </dd>

        <dt>Will you support more services?</dt>
        <dd>
          <p>
            Maybe.
            Tell me which ones I should be focusing on
            <a href="here">here</a>.
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
}
p + p {
  text-indent: 2rem;
}
</style>
