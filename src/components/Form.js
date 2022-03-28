import ExcelField from './ExcelField'

function Form() {
    return (
        <div className="from-section">
            <form className="row g-3">
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={1} />
                </div>
                <div className="col-xs-12 col-lg-6">
                    <ExcelField id={2} />
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">통합</button>
                </div>
            </form>
        </div>
    );
  }
  
  export default Form;
  