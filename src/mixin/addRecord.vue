<script>
export default {
  methods: {
    addRecord(node) {
      const {id, cover, phone, name} = node
      this.$record.add({
        id,
        cover,
        phone,
        name,
        time: new Date().toJSON().slice(5, 19).replace('T', ' ')
      })
      return new Promise(resolve => {
        this.$request.mutate({
          mutation: this.$api.addCallLog,
          variables: {
            input: {
              shopId: id,
              phone: phone,
              userId: 'dXNlci80MTY='
              // user: {
                //   id: 'xxx',
              //   name: 'test'
              // }
            }
          }
        }).then(() => {
            resolve()
          })
      })
    }
  }
}
</script>
