const applyBeforeFind = (className: string) => {
  Parse.Cloud.beforeFind(className, async (req) => {
    const user = req.user;

    if (req.master) {
        return req.query;
    }

    if (!user) {
      throw new Parse.Error(101, 'User not authenticated');
    }

    const companyId = user.get('companyId');

    if (!companyId) {
      throw new Parse.Error(101, 'User does not belong to any company');
    }

    // Agregar la restricción a la consulta
    const query = req.query;
    query.equalTo('companyId', companyId);

    // return query;
  });
};


export { applyBeforeFind };

