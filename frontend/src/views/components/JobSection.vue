<template>
  <div>
    <h3>Job Submission Details</h3>
    <table class="table table-dark">
      <tbody></tbody>
      <tr>
        <td>Job ID:</td>
        <td>{{ job_id }}</td>
      </tr>
      <tr>
        <td>Time of Submission:</td>
        <td>{{ date }}</td>
      </tr>
      <tr>
        <td>Time of Completion:</td>
        <td>{{ dateDone }}</td>
      </tr>
      <tr>
        <td>Number of sequences read in:</td>
        <td>{{ numSeq }}</td>
      </tr>
      <tr>
        <td>Number of sequences from CDHIT output:</td>
        <td>{{ numSeqReduced }}</td>
      </tr>
      <tr>
        <td>Results url:</td>
        <td>{{ url }}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  name: "job-section",
  props: {
    job_id: {
      type: String,
      default: "---",
      description: "Prediction job id",
    },
    url: String,
    numSeq: {
      type: Number,
      description: "Number of submitted sequences",
    },
    numSeqReduced: {
      type: Number,
      description: "Number of reduced sequences",
    },
    dateDone: {
      type: [Date, String],
      description: "Date Done",
    },
    date: {
      type: [Date, String],
      description: "Date Submitted",
    },
  },
};
</script>
<style></style>
