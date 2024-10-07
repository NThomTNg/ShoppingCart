import { useEffect} from 'react';
import { ModalProps } from 'react-bootstrap';

const Popup: React.FC<ModalProps> = ({ show, onClose }) => {
    const modalClass = show ? 'modal fade show d-block' : 'modal fade';
  

    useEffect(() => {
      if (show) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
  
      return () => {
        document.body.style.overflow = 'auto';
      };
    }, [show]);
  
    return (
      <div className={modalClass} tabIndex={-1} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Order Received</h5>
              <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p>Thank you for your purchase! Your order has been received.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

export default Popup;
